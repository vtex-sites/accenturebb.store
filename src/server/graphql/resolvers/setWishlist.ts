import axios from 'axios'
import { GraphQLError } from 'graphql'

import { api } from '../../../../store.config'
import secrets from '../../../../secrets.hidden.json'

type WishlistVariable = {
  email: string
  productIds: string
  id?: string
}

async function setWishlist(
  _: unknown,
  { email, productIds, id }: WishlistVariable
) {
  const { status } = await axios.put(
    id
      ? `https://${api.storeId}.${api.environment}.com.br/api/dataentities/WS/documents/${id}`
      : `https://${api.storeId}.${api.environment}.com.br/api/dataentities/WS/documents`,
    {
      email,
      productIds,
    },
    {
      headers: {
        'X-VTEX-API-AppKey': process.env.API_KEY ?? secrets.API_KEY,
        'X-VTEX-API-AppToken': process.env.API_TOKEN ?? secrets.API_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )

  if (status === 201 || status === 200 || status === 204) {
    return { message: 'Sucesso' }
  }

  return new GraphQLError('Não foi adicionar esse produto na Wishlist')
}

export default setWishlist
