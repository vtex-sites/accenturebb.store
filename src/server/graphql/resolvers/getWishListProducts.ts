import axios from 'axios'
import { GraphQLError } from 'graphql'

import { api } from '../../../../store.config'
import secrets from '../../../../secrets.hidden.json'

type GetWishListProductsT = {
  productIds: string
}
interface InstallmentProps {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  Name: string
  PaymentSystemName: string
}

async function getWishListProducts(
  _: unknown,
  { productIds }: GetWishListProductsT
) {
  let path = ''

  const ObjProductsIds = JSON.parse(productIds)

  if (!ObjProductsIds) {
    return new GraphQLError('Houve um erro com sua lista de produtos')
  }

  ObjProductsIds.forEach((refId: string) => {
    path = `${path}&fq=productId:${refId}`
  })

  const { data } = await axios.get(
    `https://${api.storeId}.${api.environment}.com.br/api/catalog_system/pub/products/search?_from=0&_to=19${path}`,
    {
      headers: {
        'X-VTEX-API-AppKey': process.env.API_KEY ?? secrets.API_KEY,
        'X-VTEX-API-AppToken': process.env.API_TOKEN ?? secrets.API_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )

  if (data) {
    // there is any here because the result of this API is super big.
    const ObjetosProntos = data.map((item: any) => {
      const sellerD = item.items[0].sellers.filter(
        (element: any) => element?.sellerDefault === true
      )

      const installments = sellerD?.map(
        (el: any) => el?.commertialOffer?.Installments
      )

      const allInstallment: InstallmentProps[][] = []

      const BasediscountHighlights = sellerD
        ?.map((el: any) => el?.commertialOffer.DiscountHighLight)
        .flat()

      const discountHighlights = BasediscountHighlights.map((el: any) => {
        return { name: Object.values(el).toString() }
      })

      installments?.forEach((element: any) => {
        if (element !== undefined && element !== null) {
          allInstallment.push(element)
        }
      })

      const { pathname } = new URL(item?.link)

      return {
        productId: item.productId,
        productName: item.productName,
        link: pathname,
        image: item.items[0].images[0]?.imageUrl,
        listPrice: item.items[0].sellers[0]?.commertialOffer?.ListPrice,
        price: item.items[0].sellers[0]?.commertialOffer?.Price,
        brand: item.brand,
        allInstallment: allInstallment.flat(),
        discountHighlights,
      }
    })

    return ObjetosProntos
  }

  return new GraphQLError('Não consultar os produtos da wishlist')
}

export default getWishListProducts
