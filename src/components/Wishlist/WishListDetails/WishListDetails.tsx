// eslint-disable-next-line import/order
import {
  ProductCard as UIProductCard,
  ProductCardContent as UIProductCardContent,
  ProductCardImage as UIProductCardImage,
} from '@faststore/ui'
import Link from 'src/components/ui/Link'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import Price from 'src/components/ui/Price'
import { Badge, DiscountBadge } from 'src/components/ui/Badge'
import type { InstallmentProps } from 'src/components/custom-components/Price/Installment'
import Installment from 'src/components/custom-components/Price/Installment'
import ProductGridSkeleton from 'src/components/skeletons/ProductGridSkeleton'
import useIsMobile from 'src/data/hook/useIsMobile'

import WishListPdpButton from '../WishListPdpButton'
import stylesGrid from '../../product/ProductGrid/product-grid.module.scss'
import styles from '../../product/ProductCard/product-card.module.scss'

interface DiscountHighlightT {
  name: string
}

export interface ProductsT {
  productId: string
  productName: string
  link: string
  image: string
  price: string
  listPrice: string
  brand: string
  allInstallment: InstallmentProps[][]
  discountHighlights: [DiscountHighlightT]
}

export interface WishListDetailsProps {
  products: ProductsT[] | any
}

const WishListDetails = ({ products }: WishListDetailsProps) => {
  const variant = 'default'
  const bordered = false
  const rowLayout = true
  const galleryList = true
  const isSimpleCard = false
  const isGallery = false

  const isMobile = useIsMobile()

  if (!products) {
    return <ProductGridSkeleton />
  }

  return (
    <>
      <p>Produtos: {products?.length}</p>
      <ul
        data-fs-product-grid
        className={stylesGrid.fsProductGrid}
        data-gallery-list-layout={!isGallery}
      >
        {products.length > 0 ? (
          <>
            {products?.map((product: ProductsT, index: number) => {
              const price = parseInt(product?.price ?? '', 10)
              const listPrice = parseInt(product?.listPrice ?? '', 10)

              return (
                <li key={index} data-fs-product-grid-item>
                  <UIProductCard
                    data-fs-product-card
                    data-fs-product-card-variant={variant}
                    data-fs-product-card-bordered={bordered}
                    data-fs-product-card-actionable={false}
                    data-fs-product-card-sku={product?.productId}
                    className={styles.fsProductCard}
                  >
                    <div
                      data-fs-product-card-row-variant={rowLayout}
                      data-fs-product-card-gallery-list={galleryList}
                      data-fs-product-card-simple={isSimpleCard}
                    >
                      <UIProductCardImage data-fs-product-card-image>
                        <img
                          src={product?.image ?? ''}
                          alt="teste"
                          width={110}
                          height={110}
                          loading="lazy"
                        />
                      </UIProductCardImage>
                      {(!galleryList || isMobile) && (
                        <ul data-fs-product-card-discount>
                          {product.discountHighlights?.map((el, ind) => (
                            <li data-fs-product-card-discount-item key={ind}>
                              {el?.name}
                            </li>
                          ))}
                        </ul>
                      )}
                      <UIProductCardContent data-fs-product-card-content>
                        <div data-fs-product-card-heading>
                          <h3 data-fs-product-card-brand-title>
                            {product?.brand}
                          </h3>
                          <h3 data-fs-product-card-title>
                            <Link
                              href={product?.link ?? ''}
                              title={product?.productName ?? ''}
                            >
                              {product?.productName}
                            </Link>
                          </h3>
                          <div data-fs-product-card-prices>
                            {galleryList && !isMobile && (
                              <ul data-fs-product-card-discount>
                                {product.discountHighlights?.map((el, i) => (
                                  <li
                                    data-fs-product-card-discount-item
                                    key={i}
                                  >
                                    {el?.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {product?.price !== product?.listPrice ? (
                              <div data-fs-product-card-list-price>
                                <Price
                                  value={listPrice}
                                  formatter={useFormattedPrice}
                                  testId="list-price"
                                  data-value={product?.price}
                                  variant="listing"
                                  classes="text__legend"
                                  SRText="Original price:"
                                />
                                {listPrice === 0 ? (
                                  <Badge>Out of stock</Badge>
                                ) : (
                                  <DiscountBadge
                                    listPrice={listPrice}
                                    spotPrice={price}
                                  />
                                )}
                              </div>
                            ) : (
                              <></>
                            )}
                            <Price
                              value={price}
                              formatter={useFormattedPrice}
                              testId="price"
                              data-value={price}
                              variant="spot"
                              classes="text__body"
                              SRText="Sale Price:"
                            />
                            {product.allInstallment ? (
                              <Installment
                                Installments={product.allInstallment}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </UIProductCardContent>
                      <div data-fs-wishlist-button>
                        <WishListPdpButton productId={product.productId} />
                      </div>
                    </div>
                  </UIProductCard>
                </li>
              )
            })}
          </>
        ) : (
          <span data-fs-wishlist-no-products>
            Você não possui produtos favoritados.
          </span>
        )}
      </ul>
    </>
  )
}

export default WishListDetails
