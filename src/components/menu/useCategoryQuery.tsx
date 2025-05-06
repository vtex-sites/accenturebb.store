import { gql } from '@faststore/graphql-utils'

import type {
  MenuCategoryQueryQueryVariables as Variables,
  MenuCategoryQueryQuery as Query,
} from '@generated/graphql'
import { useLazyQuery } from 'src/sdk/graphql/useLazyQuery'

/**
 * This query is run on the browser and contains
 * the current search state of the user
 */
export const query = gql`
  query MenuCategoryQuery($first: Int!) {
    allCollections(first: $first) {
      edges {
        node {
          type
          breadcrumbList {
            itemListElement {
              name
              item
              position
            }
          }
        }
      }
    }
  }
`

const useCategoryQuery = () => {
  const [getAllCategories, { data, error, isValidating: loading }] =
    useLazyQuery<Query, Variables>(query, {
      first: 100,
    })

  return {
    getAllCategories,
    data,
    error,
    loading,
  }
}

export default useCategoryQuery
