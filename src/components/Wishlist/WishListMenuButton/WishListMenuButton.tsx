import Icon from 'src/components/ui/Icon'
import Link from 'src/components/ui/Link'

const WishListMenuButton = () => {
  return (
    <Link data-fs-wishlist-menu-button href="/wishlist">
      <button aria-label="Wishlist button">
        <Icon name="WishlistMenu" width={26} height={26} />
      </button>
    </Link>
  )
}

export default WishListMenuButton
