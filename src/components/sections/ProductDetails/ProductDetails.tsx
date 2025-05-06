import { gql } from '@faststore/graphql-utils'
import { sendAnalyticsEvent } from '@faststore/sdk'
import { useEffect, useState, useMemo } from 'react'
import type { CurrencyCode, ViewItemEvent } from '@faststore/sdk'

import OutOfStock from 'src/components/product/OutOfStock'
import { DiscountBadge } from 'src/components/ui/Badge'
import Breadcrumb from 'src/components/ui/Breadcrumb'
import { ButtonBuy } from 'src/components/ui/Button'
import { ImageGallery } from 'src/components/ui/ImageGallery'
import Price from 'src/components/ui/Price'
import ProductTitle from 'src/components/ui/ProductTitle'
import QuantitySelector from 'src/components/ui/QuantitySelector'
import Selectors from 'src/components/ui/SkuSelector/Selectors'
import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProduct } from 'src/sdk/product/useProduct'
import { useSession } from 'src/sdk/session'
import type { ProductDetailsFragment_ProductFragment } from '@generated/graphql'
import type { AnalyticsItem } from 'src/sdk/analytics/types'
import Accordion, { AccordionItem } from 'src/components/ui/Accordion'
import Installment from 'src/components/custom-components/Price/Installment'
import type { InstallmentProps } from 'src/components/custom-components/Price/Installment/Installment'
import useIsMobile from 'src/data/hook/useIsMobile'

import Section from '../Section'
import LinksAndDownloads from './LinksAndDownloads'
import ProductSpecifications from './ProductSpecifications'
import ProductShipping from './ProductShipping'
import SoldBy from './SoldBy'
import styles from './product-details.module.scss'

interface Props {
  context: ProductDetailsFragment_ProductFragment
}

export interface AllUsableSpecsType {
  values: string[]
  originalName: string
  name: string
  others?: AllUsableSpecsType[]
}

type AvaiableVariatios = {
  src: string
  alt: string
  label: string
  value: string
}

type ElementDisabledT = {
  name: string
  propertyID: string
  value: string
  valueReference: string
}

function ProductDetails({ context: staleProduct }: Props) {
  const { currency } = useSession()
  const [addQuantity, setAddQuantity] = useState(1)
  const [indexes, setIndexes] = useState<number[]>([])

  // Stale while revalidate the product for fetching the new price etc
  const { data, isValidating } = useProduct(staleProduct.id, {
    product: staleProduct,
  })

  const isMobile = useIsMobile()

  if (!data) {
    throw new Error('NotFound')
  }

  const {
    product: {
      id,
      sku,
      gtin,
      description,
      name: variantName,
      brand,
      isVariantOf,
      isVariantOf: { name, productGroupID: productId, skuVariants, hasVariant },
      image: productImages,
      offers: {
        offers: [{ availability, price, listPrice, seller }],
        lowPrice,
      },
      breadcrumbList: breadcrumbs,
      additionalProperty,
      Sellers: sellers,
    },
  } = data

  const buyDisabled = availability !== 'https://schema.org/InStock'

  const buyProps = useBuyButton({
    id,
    price,
    listPrice,
    seller,
    quantity: addQuantity,
    itemOffered: {
      sku,
      name: variantName,
      gtin,
      image: productImages,
      brand,
      isVariantOf,
      additionalProperty,
    },
  })

  const shippingItems = {
    seller: seller.identifier,
    quantity: addQuantity.toString(),
    id: sku,
  }

  const sellerD = sellers?.filter((element) => element?.sellerDefault === true)
  const installments = sellerD?.map((el) => el?.commertialOffer?.Installments)
  const allInstallment: InstallmentProps[][] = []
  const discountHighlights = sellerD
    ?.map((el) => el?.commertialOffer?.discountHighlights)
    .flat()

  installments?.forEach((element) => {
    if (element !== undefined && element !== null) {
      allInstallment.push(element)
    }
  })

  useEffect(() => {
    sendAnalyticsEvent<ViewItemEvent<AnalyticsItem>>({
      name: 'view_item',
      params: {
        currency: currency.code as CurrencyCode,
        value: price,
        items: [
          {
            item_id: isVariantOf.productGroupID,
            item_name: isVariantOf.name,
            item_brand: brand.name,
            item_variant: sku,
            price,
            discount: listPrice - price,
            currency: currency.code as CurrencyCode,
            item_variant_name: variantName,
            product_reference_id: gtin,
          },
        ],
      },
    })
  }, [
    isVariantOf.productGroupID,
    isVariantOf.name,
    brand.name,
    sku,
    price,
    listPrice,
    currency.code,
    variantName,
    gtin,
  ])

  const specs = useMemo(() => {
    return data?.product?.specificationGroups?.filter(
      (item) => item.name !== 'allSpecifications'
    )
  }, [data?.product?.specificationGroups])

  const allUsableSpecs = useMemo(() => {
    const obj = specs
      ?.reduce((acumulador: AllUsableSpecsType[] | any, spec) => {
        const allSpecs = spec?.specifications?.map((element) => element)

        const links = allSpecs?.filter((el) => el?.name === 'Links e Downloads')

        const details = allSpecs?.filter(
          (el) => el?.name === 'Características e Detalhes'
        )

        const others = allSpecs?.filter(
          (el) =>
            el?.name !== 'Características e Detalhes' &&
            el?.name !== 'Links e Downloads'
        )

        const especificacoes = others?.length
          ? { name: 'Especificações', others }
          : []

        if (especificacoes && links && details) {
          return [...acumulador, ...details, ...links, especificacoes]
        }

        return [...acumulador]
      }, [])
      .flat()
      .sort((a: { name: number }, b: { name: number }) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
      )

    return obj
  }, [specs])

  const cor = data?.product?.additionalProperty[0]?.value

  const keysName: string[] = Object.keys(skuVariants?.availableVariations)
  const disabledElements: AvaiableVariatios | any = [] || null

  Object.values(skuVariants?.availableVariations).forEach(
    (element: [AvaiableVariatios] | any) => {
      element.forEach((item1: AvaiableVariatios) => {
        hasVariant.forEach((item) => {
          item.additionalProperty.forEach((element2) => {
            if (item1.value === element2.value) {
              if (item.offers.lowPrice === 0) {
                disabledElements.push(element2)
              }
            }
          })
        })
      })
    }
  )

  if (keysName.length >= 2) {
    Object.values(skuVariants?.availableVariations).forEach(
      (element: [AvaiableVariatios] | any) => {
        element.forEach((item1: AvaiableVariatios, index: number) => {
          disabledElements?.forEach((elementDisabled: ElementDisabledT) => {
            if (item1?.value === elementDisabled?.value) {
              const newAvaiables =
                skuVariants?.availableVariations[keysName[1]][index] ?? null

              if (disabledElements[0]?.value === cor) {
                if (elementDisabled?.name !== 'Cor') {
                  newAvaiables.disabled = true
                }
              }
            }
          })
        })
      }
    )
  } else {
    Object.values(skuVariants?.availableVariations).forEach(
      (element: [AvaiableVariatios] | any) => {
        element.forEach((item1: AvaiableVariatios, index: number) => {
          disabledElements?.forEach((elementDisabled: ElementDisabledT) => {
            if (item1?.value === elementDisabled.value) {
              const newAvaiables =
                skuVariants?.availableVariations[keysName[0]][index] ?? null

              newAvaiables.disabled = true
            }
          })
        })
      }
    )
  }

  // this function is to bring all specifications OPEN
  // useEffect(() => {
  //   const indexs = allUsableSpecs?.map((_: null, index: number) => index)

  //   setIndexes(indexs)
  // }, [allUsableSpecs])
  const settingSection = () => (
    <section
      data-fs-product-settings-sticky={!isMobile}
      data-fs-product-details-settings
    >
      <SoldBy sellers={sellers} isMobile={isMobile} />
      {lowPrice > 0 ? (
        <section data-fs-product-details-values>
          <div data-fs-product-details-prices>
            {listPrice !== lowPrice && (
              <div data-fs-product-details-prices-badge>
                <Price
                  value={listPrice}
                  formatter={useFormattedPrice}
                  testId="list-price"
                  data-value={listPrice}
                  variant="listing"
                  classes="text__legend"
                  SRText="Original price:"
                />
                <DiscountBadge listPrice={listPrice} spotPrice={lowPrice} />
              </div>
            )}
            <Price
              value={lowPrice}
              formatter={useFormattedPrice}
              testId="price"
              data-value={lowPrice}
              variant="spot"
              classes="text__lead"
              SRText="Sale Price:"
            />

            {allInstallment ? (
              <Installment Installments={allInstallment} />
            ) : (
              <></>
            )}
            <ul data-fs-product-card-discount>
              {discountHighlights?.map((el, i) => (
                <li data-fs-product-card-discount-item key={i}>
                  {el?.name}
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="prices">
              <p className="price__old text__legend">{formattedListPrice}</p>
              <p className="price__new">{isValidating ? '' : formattedPrice}</p>
            </div> */}
          <QuantitySelector min={1} max={10} onChange={setAddQuantity} />
        </section>
      ) : (
        <div className="product-details__out-of-stock">
          <span>Produto indisponível</span>
        </div>
      )}
      {/* NOTE: A loading skeleton had to be used to avoid a Lighthouse's
              non-composited animation violation due to the button transitioning its
              background color when changing from its initial disabled to active state.
              See full explanation on commit https://git.io/JyXV5. */}
      {isValidating ? (
        <AddToCartLoadingSkeleton />
      ) : (
        <ButtonBuy disabled={buyDisabled} {...buyProps}>
          Adicionar ao carrinho
        </ButtonBuy>
      )}
      {!availability && (
        <OutOfStock
          onSubmit={(email) => {
            console.info(email)
          }}
        />
      )}
      <ProductShipping items={shippingItems} />
    </section>
  )

  return (
    <Section
      className={`${styles.fsProductDetails} layout__content-full layout__section`}
    >
      <Breadcrumb breadcrumbList={breadcrumbs.itemListElement} />
      <div data-fs-wrapper>
        <section data-fs-product-details-body>
          <header data-fs-product-details-title>
            <ProductTitle
              title={<h1>{name}</h1>}
              label={
                <DiscountBadge listPrice={listPrice} spotPrice={lowPrice} big />
              }
              refNumber={productId}
            />
          </header>

          <ImageGallery images={productImages} productId={productId} />
          <section data-fs-product-details-selector>
            {skuVariants && (
              <Selectors
                slugsMap={skuVariants.slugsMap}
                availableVariations={skuVariants.availableVariations}
                activeVariations={skuVariants.activeVariations}
              />
            )}
          </section>
          {isMobile && settingSection()}
          <section data-fs-product-details-content>
            <article data-fs-product-details-description>
              <h2 data-fs-product-details-subsection>Informações do produto</h2>
              <p className="text__body">{description}</p>
            </article>
            <article>
              <Accordion expandedIndices={indexes} onChange={() => {}}>
                {allUsableSpecs.map(
                  (spec: AllUsableSpecsType, index: number) => {
                    const isExpanded =
                      indexes?.filter((el) => el === index).length > 0

                    return (
                      <AccordionItem
                        key={index}
                        isExpanded={isExpanded}
                        buttonLabel={spec.name}
                        onClick={() =>
                          !isExpanded
                            ? setIndexes([...indexes, index])
                            : setIndexes(indexes.filter((el) => el !== index))
                        }
                        itemType="normal"
                        data-fs-accordion-pdp
                      >
                        {spec.name === 'Links e Downloads' && (
                          <LinksAndDownloads values={spec.values} />
                        )}
                        {spec.name === 'Características e Detalhes' && (
                          <span> {spec.values} </span>
                        )}
                        {spec.name === 'Especificações' && (
                          <ProductSpecifications specifications={spec.others} />
                        )}
                      </AccordionItem>
                    )
                  }
                )}
              </Accordion>
            </article>
          </section>
        </section>
        {!isMobile && settingSection()}
      </div>
    </Section>
  )
}

function AddToCartLoadingSkeleton() {
  // Generated via https://skeletonreact.com/.
  return (
    <svg
      role="img"
      width="100%"
      height="48"
      aria-labelledby="loading-aria"
      viewBox="0 0 112 48"
      preserveAspectRatio="none"
    >
      <title id="loading-aria">Carregando...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip-path)"
        style={{ fill: 'url("#fill")' }}
      />
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="0" rx="2" ry="2" width="112" height="48" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="1.59996" stopColor="#ecebeb" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="2.59996" stopColor="#f3f3f3" stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export const fragment = gql`
  fragment ProductDetailsFragment_product on StoreProduct {
    id: productID
    sku
    name
    gtin
    description
    specificationGroups {
      name
      originalName
      specifications {
        values
        originalName
        name
      }
    }

    isVariantOf {
      productGroupID
      name
      hasVariant {
        offers {
          lowPrice
        }
        additionalProperty {
          name
          propertyID
          value
          valueReference
        }
        slug
        image {
          url
          alternateName
        }
      }
      skuVariants {
        activeVariations
        slugsMap(dominantVariantName: "Cor")
        availableVariations(dominantVariantName: "Cor")
      }
    }

    image {
      url
      alternateName
    }

    brand {
      name
    }

    offers {
      lowPrice
      offers {
        availability
        price
        listPrice
        seller {
          identifier
        }
      }
    }
    Sellers {
      sellerDefault
      sellerName
      commertialOffer {
        Installments {
          Value
          InterestRate
          TotalValuePlusInterestRate
          NumberOfInstallments
          Name
          PaymentSystemName
        }

        discountHighlights {
          name
        }
      }
    }
    breadcrumbList {
      itemListElement {
        item
        name
        position
      }
    }

    # Contains necessary info to add this item to cart
    ...CartProductItem
  }
`
export default ProductDetails
