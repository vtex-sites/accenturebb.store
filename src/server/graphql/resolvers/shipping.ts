import axios from 'axios'
import { GraphQLError } from 'graphql'

import { api } from '../../../../store.config'

type ShippingVariable = {
  country: string
  items: Array<{
    id: string
    quantity: string
    seller: string
  }>
  postalCode: string
}

async function shipping(
  _: unknown,
  { country, items, postalCode }: ShippingVariable
) {
  const { data } = await axios.post(
    `https://${api.storeId}.${api.environment}.com.br/api/checkout/pub/orderForms/simulation?RnbBehavior=0&sc=1`,
    { country, items, postalCode }
  )

  if (!data) {
    return new GraphQLError(
      'Não foi possivel calcular o frete para esse produto'
    )
  }

  return data
}

export default shipping
