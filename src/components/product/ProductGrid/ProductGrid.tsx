import ProductGridSkeleton from 'src/components/skeletons/ProductGridSkeleton'
import type { ProductSummary_ProductFragment } from '@generated/graphql'

import ProductCard from '../ProductCard'
import styles from './product-grid.module.scss'

interface Props {
  /**
   * Products listed on the grid.
   */
  products: Array<{ node: ProductSummary_ProductFragment }>
  page: number
  /**
   * Quantity of products listed.
   */
  pageSize: number
  isGallery?: boolean
}

function ProductGrid({ products, page, pageSize, isGallery = false }: Props) {
  return (
    <ProductGridSkeleton loading={products.length === 0}>
      <ul
        data-fs-product-grid
        className={styles.fsProductGrid}
        data-gallery-list-layout={!isGallery}
      >
        {products.map(({ node: product }, idx) => (
          <li key={`${product.id}`} data-fs-product-grid-item>
            <ProductCard
              product={product}
              index={pageSize * page + idx + 1}
              bordered
              rowLayout={!isGallery}
              galleryList={!isGallery}
            />
          </li>
        ))}
      </ul>
    </ProductGridSkeleton>
  )
}

export default ProductGrid
