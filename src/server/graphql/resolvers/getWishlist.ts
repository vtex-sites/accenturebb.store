import axios from 'axios'
import { GraphQLError } from 'graphql'

import { api } from '../../../../store.config'
import secrets from '../../../../secrets.hidden.json'

type GetWishListT = {
  email: string
}

async function getWishlist(_: unknown, { email }: GetWishListT) {
  const { data } = await axios.get(
    `https://${api.storeId}.${api.environment}.com.br/api/dataentities/WS/search?email=${email}&_fields=_all`,
    {
      headers: {
        'X-VTEX-API-AppKey': process.env.API_KEY ?? secrets.API_KEY,
        'X-VTEX-API-AppToken': process.env.API_TOKEN ?? secrets.API_TOKEN,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'REST-Range': 'resources=0-10',
      },
    }
  )

  if (!data) {
    return new GraphQLError('Não foi possivel ver a wishlist desse usuario')
  }

  return data[0]
}

export default getWishlist
