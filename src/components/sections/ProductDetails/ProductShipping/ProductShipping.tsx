import { RadioGroup, RadioOption } from '@faststore/ui'
import { useCallback, useEffect, useRef, useState } from 'react'

import Icon from 'src/components/ui/Icon'
import InputText from 'src/components/ui/InputText'
import Price from 'src/components/ui/Price'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { sessionStore, useSession, validateSession } from 'src/sdk/session'

import useShippingQuery from './useShippingQuery'

interface ItemsProps {
  seller: string
  id: string
  quantity: string
}
interface ShippingItemsProps {
  items: ItemsProps
}

type SlaT = {
  name: string
  pickupStoreInfo: {
    friendlyName: string
    isPickupStore: boolean
  }
  shippingEstimate: string
  price: number
}

const ProductShipping = ({ items }: ShippingItemsProps) => {
  const { isValidating, ...session } = useSession()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [shippingQuery, setShippingQuery] = useState<SlaT | any>(null)

  const [showMore, setShowMore] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // const {
  //   getShippingEstimate,
  //   loading,
  //   data,
  //   error: queryError,
  // } = useShippingQuery()

  const {
    data,
    error: queryError,
    isValidating: loading,
  } = useShippingQuery('BRA', [items], session?.postalCode ?? '')

  const [estimatedDate, setEstimatedDate] = useState({
    day: '',
    month: '',
    weekDay: '',
  })

  const getDate = useCallback(() => {
    const currentDate = new Date()

    const estimate = shippingQuery.shippingEstimate

    if (!estimate) {
      return null
    }

    const parsed = parseInt(estimate, 10)

    currentDate.setDate(currentDate.getDate() + parsed)
    setEstimatedDate({
      day: currentDate.toLocaleDateString(undefined, { day: 'numeric' }),
      month: currentDate.toLocaleDateString('pt-BR', { month: 'long' }),
      weekDay: currentDate.toLocaleDateString('pt-BR', { weekday: 'long' }),
    })

    return true
  }, [shippingQuery])

  useEffect(() => {
    if (data?.shipping?.logisticsInfo) {
      setShippingQuery(data?.shipping?.logisticsInfo?.[0]?.slas?.[0] ?? null)
    }
  }, [data])

  useEffect(() => {
    if (shippingQuery) {
      getDate()
    }
  }, [shippingQuery, getDate])

  useEffect(() => {
    if (session.postalCode) {
      setPostalCode(session.postalCode)
    }
  }, [session.postalCode])

  const handleSubmit = async () => {
    const value = inputRef?.current?.value

    if (typeof value !== 'string') {
      return
    }

    setErrorMessage('')

    try {
      const newSession = {
        ...session,
        postalCode: value,
      }

      const validatedSession = await validateSession(newSession)

      sessionStore.set(validatedSession ?? newSession)
    } catch (error) {
      setErrorMessage('CEP inválido')
      setTimeout(() => {
        setErrorMessage('')
      }, 1500)
      setShippingQuery(null)
    }
  }

  useEffect(() => {
    setErrorMessage('CEP inválido')
    setTimeout(() => {
      setErrorMessage('')
    }, 1500)
    setShippingQuery(null)
  }, [queryError])

  const slas = data?.shipping?.logisticsInfo?.[0]?.slas

  return (
    <div data-fs-product-shipping>
      <div data-fs-product-shipping-input>
        <span className="product-shipping-title">Valor e prazo de entrega</span>
        <div>
          <InputText
            inputRef={inputRef}
            id="postal-code-input"
            error={errorMessage}
            label="CEP"
            actionable
            onSubmit={handleSubmit}
            buttonActionText="Buscar"
            onClear={() => {}}
            defaultValue={session.postalCode ?? ''}
            data-fs-shipping-input-text
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <span> Carregando..</span>
      ) : (
        session.postalCode &&
        shippingQuery &&
        !errorMessage &&
        data && (
          <>
            <div data-fs-product-shipping-container>
              <div data-fs-product-shipping-img>
                <Icon name="ShippingTruck" width={26} height={26} />
              </div>

              <div data-fs-product-shipping-content>
                <span className="product-shipping-title">
                  {shippingQuery?.pickupStoreInfo?.isPickupStore
                    ? shippingQuery?.pickupStoreInfo?.friendlyName
                    : shippingQuery?.name}
                </span>
                <span className="product-shipping-text">
                  Chega até {estimatedDate?.weekDay}, {estimatedDate?.day} de{' '}
                  {estimatedDate?.month}
                  {shippingQuery?.price / 100 > 0
                    ? ` por R$ ${(shippingQuery?.price / 100)
                        .toFixed(2)
                        .toString()
                        .replace('.', ',')}`
                    : ' Gratis'}
                </span>
                <button onClick={() => setShowMore(!showMore)}>
                  Ver mais opções de envio
                </button>
              </div>
            </div>
            <div data-fs-product-shipping-options={showMore}>
              <RadioGroup
                selectedValue={shippingQuery?.name ?? ''}
                name="option-shipping"
              >
                {showMore &&
                  slas?.map((sla: SlaT | any, index: number) => {
                    const name = sla?.pickupStoreInfo?.isPickupStore
                      ? sla?.pickupStoreInfo?.friendlyName
                      : sla?.name

                    const estimated = parseInt(sla?.shippingEstimate, 10)

                    const price = parseInt(sla.price, 10) / 100

                    return (
                      <RadioOption
                        key={String(index)}
                        label={name}
                        value={name}
                        disabled={false}
                        checked={sla.name === shippingQuery?.name}
                        onClick={() => setShippingQuery(slas[index])}
                      >
                        <div key={index} className="shipping-option">
                          <span className="shipping-name">{name}</span>
                          <span className="shipping-date">
                            {estimated} {estimated > 1 ? 'dias' : 'dia'}
                          </span>
                          <span className="shipping-price">
                            {price > 0 ? (
                              <Price
                                value={price}
                                formatter={useFormattedPrice}
                                SRText=""
                              />
                            ) : (
                              'Gratis'
                            )}
                          </span>
                        </div>
                      </RadioOption>
                    )
                  })}
              </RadioGroup>
            </div>
          </>
        )
      )}
    </div>
  )
}

export default ProductShipping
