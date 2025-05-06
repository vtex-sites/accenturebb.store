import { gql } from '@faststore/graphql-utils'
import type {
  NewsLetterQueryQuery as Query,
  NewsLetterQueryQueryVariables as Variables,
  NewsLetterQueryUpdateMutation as Mutation,
  NewsLetterQueryUpdateMutationVariables as VariablesUpdate,
} from '@generated/graphql'
import { useLazyQuery } from 'src/sdk/graphql/useLazyQuery'

export const mutation = gql`
  mutation NewsLetterQueryUpdate($email: String!, $id: String) {
    newsLetterUpdate(email: $email, id: $id) {
      id
    }
  }
`

export const query = gql`
  query NewsLetterQuery($email: String!) {
    newsLetter(email: $email) {
      id
    }
  }
`

export const useNewsletterQuery = () => {
  const [subscribeUser, { data, error, isValidating: loading }] = useLazyQuery<
    Query,
    Variables
  >(query, { email: '' })

  return {
    subscribeUser,
    data,
    error,
    loading,
  }
}

export const useNewsletterQueryUpdate = () => {
  const [updateUser, { data, error, isValidating: loading }] = useLazyQuery<
    Mutation,
    VariablesUpdate
  >(mutation, { email: '', id: '' })

  return {
    updateUser,
    data,
    error,
    loading,
  }
}
