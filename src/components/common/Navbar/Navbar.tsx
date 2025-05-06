import { Suspense, useRef, useState } from 'react'

import Menu from 'src/components/menu'
import type { SearchInputRef } from 'src/components/search/SearchInput'
import CartToggle from 'src/components/cart/CartToggle'
import SearchInput from 'src/components/search/SearchInput'
import Button, {
  ButtonSignIn,
  ButtonSignInFallback,
} from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'
import Link from 'src/components/ui/Link'
import Logo from 'src/components/ui/Logo'
import WishListMenuButton from 'src/components/Wishlist/WishListMenuButton'
import { mark } from 'src/sdk/tests/mark'
import { useUI } from 'src/sdk/ui/Provider'

import styles from './navbar.module.scss'
import NavLinks from './NavLinks'

function Navbar() {
  const { navbar: displayNavbar, openNavbar, closeNavbar } = useUI()
  const [isOpen, setIsOpen] = useState(displayNavbar)
  const searchMobileRef = useRef<SearchInputRef>(null)

  const [searchExpanded, setSearchExpanded] = useState(false)

  const showMenu = (show: boolean) => {
    if (show) {
      openNavbar
    } else {
      closeNavbar
    }

    setIsOpen(show)
  }

  return (
    <header
      data-fs-navbar
      className={`${styles.fsNavbar} layout__content-full`}
    >
      <div className="layout__content" data-fs-navbar-header>
        <section data-fs-navbar-row>
          {!searchExpanded && (
            <>
              <Button
                data-fs-navbar-button-menu
                aria-label="Open Menu"
                icon={<Icon name="List" width={32} height={32} />}
                onClick={() => showMenu(!isOpen)}
              />
              <Link
                href="/"
                aria-label="Go to Faststore home"
                title="Go to Faststore home"
                data-fs-navbar-logo
              >
                <Logo />
              </Link>
            </>
          )}
          <SearchInput />
          <div
            data-fs-navbar-buttons
            data-fs-navbar-search-expanded={searchExpanded}
          >
            {searchExpanded && (
              <Button
                data-fs-button-collapse
                aria-label="Collapse search bar"
                icon={<Icon name="CaretLeft" width={32} height={32} />}
                onClick={() => {
                  setSearchExpanded(false)
                  searchMobileRef.current?.resetSearchInput()
                }}
              />
            )}
            <Suspense fallback={<ButtonSignInFallback />}>
              <ButtonSignIn />
            </Suspense>
            <WishListMenuButton />
            <CartToggle />
          </div>
        </section>
        <NavLinks />
      </div>

      <div>
        <Menu menuIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
    </header>
  )
}

Navbar.displayName = 'Navbar'

export default mark(Navbar)
