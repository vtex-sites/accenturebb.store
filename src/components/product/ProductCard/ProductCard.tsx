import {
  ProductCard as UIProductCard,
  ProductCardActions as UIProductCardActions,
  ProductCardContent as UIProductCardContent,
  ProductCardImage as UIProductCardImage,
} from '@faststore/ui'
import { gql } from '@faststore/graphql-utils'
import { memo } from 'react'
import type { ReactNode } from 'react'

import Link from 'src/components/ui/Link'
import { Badge, DiscountBadge } from 'src/components/ui/Badge'
import { Image } from 'src/components/ui/Image'
import Price from 'src/components/ui/Price'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'
import { useProductLink } from 'src/sdk/product/useProductLink'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import styles from 'src/components/product/ProductCard/product-card.module.scss'
import type { InstallmentProps } from 'src/components/custom-components/Price/Installment'
import Installment from 'src/components/custom-components/Price/Installment'
import useIsMobile from 'src/data/hook/useIsMobile'

type Variant = 'wide' | 'default'

export interface ProductCardProps {
  product: ProductSummary_ProductFragment
  index: number
  /**
   * Sets a border to the component.
   */
  bordered?: boolean
  /**
   * Sets the component's size.
   */
  variant?: Variant
  /**
   * Specifies the ProductCard image's aspect ratio.
   */
  aspectRatio?: number
  /**
   * Enables a ButtonBuy to the component.
   */
  ButtonBuy?: ReactNode
  rowLayout?: boolean
  galleryList?: boolean
  isSimpleCard?: boolean
}

function ProductCard({
  product,
  index,
  variant = 'default',
  bordered = false,
  aspectRatio = 1,
  rowLayout,
  ButtonBuy,
  galleryList = false,
  isSimpleCard,
  ...otherProps
}: ProductCardProps) {
  const isMobile = useIsMobile()

  const {
    sku,
    brand: { brandName },
    isVariantOf: { name },
    image: [img],
    offers: {
      lowPrice: spotPrice,
      offers: [{ listPrice, availability }],
    },
    Sellers: sellers,
  } = product

  const sellerD = sellers?.filter((element) => element?.sellerDefault === true)
  const installments = sellerD?.map((el) => el?.commertialOffer?.Installments)
  const allInstallment: InstallmentProps[][] = []
  const discountHighlights = sellerD
    ?.map((el) => el?.commertialOffer?.discountHighlights)
    .flat()

  installments?.forEach((element) => {
    if (element !== undefined && element !== null) {
      allInstallment.push(element)
    }
  })

  const linkProps = useProductLink({ product, selectedOffer: 0, index })
  const outOfStock = availability !== 'https://schema.org/InStock'

  return (
    <UIProductCard
      data-fs-product-card
      data-fs-product-card-variant={variant}
      data-fs-product-card-bordered={bordered}
      data-fs-product-card-actionable={!!ButtonBuy}
      data-fs-product-card-sku={sku}
      className={styles.fsProductCard}
      {...otherProps}
    >
      <div
        data-fs-product-card-row-variant={rowLayout}
        data-fs-product-card-gallery-list={galleryList}
        data-fs-product-card-simple={isSimpleCard}
      >
        <UIProductCardImage data-fs-product-card-image>
          <Image
            src={img.url}
            alt={img.alternateName}
            width={360}
            height={360 / aspectRatio}
            sizes="(max-width: 768px) 25vw, 30vw"
            loading="lazy"
          />

          {!!ButtonBuy && (
            <UIProductCardActions data-fs-product-card-actions>
              {ButtonBuy}
            </UIProductCardActions>
          )}
        </UIProductCardImage>
        {(!galleryList || isMobile) && (
          <ul data-fs-product-card-discount>
            {discountHighlights?.map((el, ind) => (
              <li data-fs-product-card-discount-item key={ind}>
                {el?.name}
              </li>
            ))}
          </ul>
        )}
        <UIProductCardContent data-fs-product-card-content>
          <div data-fs-product-card-heading>
            <h3 data-fs-product-card-brand-title>{brandName}</h3>
            <h3 data-fs-product-card-title>
              <Link {...linkProps} title={name}>
                {name}
              </Link>
            </h3>
            <div data-fs-product-card-prices>
              {galleryList && !isMobile && (
                <ul data-fs-product-card-discount>
                  {discountHighlights?.map((el, i) => (
                    <li data-fs-product-card-discount-item key={i}>
                      {el?.name}
                    </li>
                  ))}
                </ul>
              )}
              {spotPrice !== listPrice ? (
                <div data-fs-product-card-list-price>
                  <Price
                    value={listPrice}
                    formatter={useFormattedPrice}
                    testId="list-price"
                    data-value={listPrice}
                    variant="listing"
                    classes="text__legend"
                    SRText="Original price:"
                  />
                  {outOfStock ? (
                    <Badge>Out of stock</Badge>
                  ) : (
                    <DiscountBadge
                      listPrice={listPrice}
                      spotPrice={spotPrice}
                    />
                  )}
                </div>
              ) : (
                <></>
              )}
              <Price
                value={spotPrice}
                formatter={useFormattedPrice}
                testId="price"
                data-value={spotPrice}
                variant="spot"
                classes="text__body"
                SRText="Sale Price:"
              />
              {allInstallment ? (
                <Installment Installments={allInstallment} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </UIProductCardContent>
      </div>
    </UIProductCard>
  )
}

export const fragment = gql`
  fragment ProductSummary_product on StoreProduct {
    id: productID
    slug
    sku
    brand {
      brandName: name
    }
    name
    gtin

    isVariantOf {
      productGroupID
      name
    }

    image {
      url
      alternateName
    }

    brand {
      name
    }

    offers {
      lowPrice
      offers {
        availability
        price
        listPrice
        quantity
        seller {
          identifier
        }
      }
    }
    Sellers {
      sellerDefault
      commertialOffer {
        Installments {
          Value
          InterestRate
          TotalValuePlusInterestRate
          NumberOfInstallments
          Name
          PaymentSystemName
        }

        discountHighlights {
          name
        }
      }
    }
  }
`

export default memo(ProductCard)
