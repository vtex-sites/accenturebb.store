import { useEffect, useState } from 'react'

import Icon from 'src/components/ui/Icon'
import useWishlist from 'src/data/hook/useWishlist'

interface WishListPdpButtonProps {
  productId?: string
}

const WishListPdpButton = ({ productId }: WishListPdpButtonProps) => {
  const [isSelected, setIsSelected] = useState(false)

  const wishlistData = useWishlist()

  const ctxProductId = wishlistData?.productIds
  const ctxEmail = wishlistData?.email
  const ctxId = wishlistData?.id

  useEffect(() => {
    ctxProductId &&
      setIsSelected(
        ctxProductId.filter((value) => value === productId).length > 0
      )
  }, [productId, ctxProductId])

  function handleAddWishlist() {
    const newData = ctxProductId && [...ctxProductId, productId]

    wishlistData?.addWishList({
      email: ctxEmail?.length ? ctxEmail : 'jose.ricardo.pinto@accenture.com',
      productIds: JSON.stringify(newData),
      id: ctxId ?? '',
    })
  }

  function handleRemoveWishlist() {
    const newData = ctxProductId?.filter((item) => {
      return item !== productId
    })

    wishlistData?.addWishList({
      email: ctxEmail ?? '',
      productIds: JSON.stringify(newData),
      id: ctxId ?? '',
    })
  }

  return (
    <>
      {isSelected ? (
        <button
          aria-label="wishlist pdp button"
          data-fs-wishlist-pdp-button
          onClick={() => handleRemoveWishlist()}
        >
          <Icon name="WishlistChecked" width={26} height={26} />
        </button>
      ) : (
        <button data-fs-wishlist-pdp-button onClick={() => handleAddWishlist()}>
          <Icon name="Wishlist" width={26} height={26} />
        </button>
      )}
    </>
  )
}

export default WishListPdpButton
