import { gql } from '@faststore/graphql-utils'

import { useQuery } from 'src/sdk/graphql/useQuery'
import type {
  ShippingQueryQuery as Query,
  ShippingQueryQueryVariables as Variables,
} from '@generated/graphql'

type ShippingItem = {
  id: string
  quantity: string
  seller: string
}

const query = gql`
  query ShippingQuery(
    $country: String
    $items: [ShippingItem]
    $postalCode: String!
  ) {
    shipping(postalCode: $postalCode, items: $items, country: $country) {
      logisticsInfo {
        slas {
          name
          pickupStoreInfo {
            friendlyName
            isPickupStore
          }
          shippingEstimate
          price
        }
      }
    }
  }
`

const useShippingQuery = (
  country: string,
  items: [ShippingItem],
  postalCode: string
) => {
  return useQuery<Query, Variables>(query, {
    country,
    items,
    postalCode,
  })
}

export default useShippingQuery
