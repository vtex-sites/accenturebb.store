import { gql } from '@faststore/graphql-utils'
import type {
  GetWishlistQueryQuery as Query,
  GetWishlistQueryQueryVariables as Variables,
  SetWishlistMutationMutation as Mutation,
  SetWishlistMutationMutationVariables as MutationVariables,
  GetWishListProductsQuery as ProductsWishlistQuery,
  GetWishListProductsQueryVariables as ProductsWishlistVariables,
} from '@generated/graphql'
import { useLazyQuery } from 'src/sdk/graphql/useLazyQuery'
import { useQuery } from 'src/sdk/graphql/useQuery'

const query = gql`
  query GetWishlistQuery($email: String) {
    getWishlist(email: $email) {
      id
      productIds
      email
    }
  }
`

const mutation = gql`
  mutation SetWishlistMutation(
    $email: String
    $productIds: String
    $id: String
  ) {
    setWishlist(email: $email, productIds: $productIds, id: $id) {
      message
    }
  }
`

export const useWishlistQuery = () => {
  const [getWishlist, { data, error, isValidating: loading }] = useLazyQuery<
    Query,
    Variables
  >(query, {
    email: '',
  })

  return {
    getWishlist,
    data,
    error,
    loading,
  }
}

export const useWishlistMutation = () => {
  const [addWishList, { data, error, isValidating: loading }] = useLazyQuery<
    Mutation,
    MutationVariables
  >(mutation, {
    email: '',
    productIds: '',
    id: '',
  })

  return {
    addWishList,
    data,
    error,
    loading,
  }
}

const getWishListProductsQuery = gql`
  query GetWishListProducts($productIds: String) {
    getWishListProducts(productIds: $productIds) {
      allInstallment {
        Value
        TotalValuePlusInterestRate
        PaymentSystemName
        PaymentSystemGroupName
        NumberOfInstallments
        Name
        InterestRate
      }
      discountHighlights {
        name
      }
      brand
      image
      listPrice
      link
      price
      productId
      productName
    }
  }
`

export const useWishListProductsQuery = (productIds: string) => {
  return useQuery<ProductsWishlistQuery, ProductsWishlistVariables>(
    getWishListProductsQuery,
    {
      productIds,
    }
  )
}
