import { useContext } from 'react'

import { WishlistContext } from '../context/WishlistContext'

const useWishlist = () => useContext(WishlistContext)

export default useWishlist
