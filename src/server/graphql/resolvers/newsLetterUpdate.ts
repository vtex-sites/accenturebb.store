import axios from 'axios'
import { GraphQLError } from 'graphql'

import { api } from '../../../../store.config'
import secrets from '../../../../secrets.hidden.json'

type NewsLetterVariable = {
  email: string
  id: string
}

async function newsLetterUpdate(_: unknown, { email, id }: NewsLetterVariable) {
  const data = id
    ? {
        isNewsletterOptIn: true,
      }
    : {
        isNewsletterOptIn: true,
        email,
      }

  try {
    await axios.patch(
      `https://${api.storeId}.${api.environment}.com.br/api/dataentities/CL/documents/${id}`,
      data,
      {
        headers: {
          'content-type': 'application/json',
          'X-VTEX-API-AppKey': process.env.API_KEY ?? secrets.API_KEY,
          'X-VTEX-API-AppToken': process.env.API_TOKEN ?? secrets.API_TOKEN,
        },
      }
    )
  } catch (error) {
    console.error(error)

    return new GraphQLError(`Error newsletter: ${error}`)
  }

  return { id }
}

export default newsLetterUpdate
