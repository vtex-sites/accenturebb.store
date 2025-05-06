import axios from 'axios'
import { GraphQLError } from 'graphql'

import { api } from '../../../../store.config'
import secrets from '../../../../secrets.hidden.json'

type NewsLetterVariable = {
  email: string
  id: string
}

async function newsLetter(_: unknown, { email }: NewsLetterVariable) {
  const { data } = await axios.get(
    `https://${api.storeId}.${api.environment}.com.br/api/dataentities/CL/search?email=${email}&_fields=id`,
    {
      headers: {
        'content-type': 'application/json',
        'X-VTEX-API-AppKey': process.env.API_KEY ?? secrets.API_KEY,
        'X-VTEX-API-AppToken': process.env.API_TOKEN ?? secrets.API_TOKEN,
      },
    }
  )

  if (!data) {
    return new GraphQLError('Error get newsletter')
  }

  return data[0]
}

export default newsLetter
