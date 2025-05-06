import { lazy, Suspense } from 'react'
import type { PropsWithChildren } from 'react'

import Footer from 'src/components/common/Footer'
import Navbar from 'src/components/common/Navbar'
import Toast from 'src/components/common/Toast'
import { useUI } from 'src/sdk/ui/Provider'

import { WishlistProvider } from './data/context/WishlistContext'
import { CategoriesProvider } from './data/context/CategoriesContext'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))
const RegionModal = lazy(
  () => import('src/components/regionalization/RegionalizationModal')
)

function Layout({ children }: PropsWithChildren) {
  const { cart: displayCart, modal: displayModal } = useUI()

  return (
    <>
      <CategoriesProvider>
        <Navbar />

        <Toast />

        <WishlistProvider>
          <main>{children}</main>
        </WishlistProvider>
      </CategoriesProvider>

      <Footer />

      {displayCart && (
        <Suspense fallback={null}>
          <CartSidebar />
        </Suspense>
      )}

      {displayModal && (
        <Suspense fallback={null}>
          <RegionModal />
        </Suspense>
      )}
    </>
  )
}

export default Layout
