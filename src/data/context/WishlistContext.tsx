import { createContext, useEffect, useState } from 'react'
import {
  useWishlistQuery,
  useWishlistMutation,
} from 'src/components/Wishlist/useWishlistQuery'

type WishlistContextProps = {
  productIds?: string[]
  id: string
  email: string
  loading?: boolean
  addWishList: any
}

export const WishlistContext = createContext<WishlistContextProps | null>(null)

export const WishlistProvider: React.FC<any> = ({ children }) => {
  const [productIds, setProductIds] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    addWishList,
    loading: mutationLoading,
    data: mutationData,
  } = useWishlistMutation()

  const { getWishlist, loading: queryLoading, data } = useWishlistQuery()

  useEffect(() => {
    getWishlist({ email: 'jose.ricardo.pinto@accenture.com' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationData])

  useEffect(() => {
    data?.getWishlist?.productIds &&
      setProductIds(JSON.parse(data?.getWishlist?.productIds))
    data?.getWishlist?.email && setEmail(data?.getWishlist?.email)
    data?.getWishlist?.id && setId(data?.getWishlist?.id)
  }, [data])

  useEffect(() => {
    mutationLoading ? setLoading(true) : setLoading(false)
    queryLoading ? setLoading(true) : setLoading(false)
  }, [mutationLoading, queryLoading])

  return (
    <WishlistContext.Provider
      value={{
        productIds,
        email,
        id,
        loading,
        addWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
