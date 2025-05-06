import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

import ProductShelfSkeleton from 'src/components/skeletons/ProductShelfSkeleton'
import { useProductsQuery } from 'src/sdk/product/useProductsQuery'
import type { ProductsQueryQueryVariables } from '@generated/graphql'
import { useViewItemListEvent } from 'src/sdk/analytics/hooks/useViewItemListEvent'
import KeenSlider from 'src/components/custom-components/KeenSlider/KeenSlider'
import useIsMobile from 'src/data/hook/useIsMobile'

import ProductCard from '../../product/ProductCard'
import Section from '../Section'
import styles from './product-shelf.module.scss'

interface ProductShelfProps extends Partial<ProductsQueryQueryVariables> {
  title: string
  withDivisor?: boolean
  noMargins?: boolean
  shelfType?: string
  isSimpleCard?: boolean
  itens?: number
  otherBackground?: boolean
  productClusterIds?: string
  size?: string
}

function ProductShelf({
  title,
  withDivisor = false,
  noMargins = false,
  isSimpleCard,
  shelfType = 'isCarousel',
  itens,
  otherBackground,
  productClusterIds,
  size = 'small',
  ...variables
}: ProductShelfProps) {
  const viewedOnce = useRef(false)
  const { ref, inView } = useInView()
  const isMobile = useIsMobile()

  if (productClusterIds) {
    variables.selectedFacets = {
      key: 'productClusterIds',
      value: productClusterIds,
    }
  }

  const products = useProductsQuery(variables)
  const productEdges = products?.edges ?? []

  const { sendViewItemListEvent } = useViewItemListEvent({
    products: productEdges,
    title,
    page: 0,
    pageSize: 0,
  })

  useEffect(() => {
    if (inView && !viewedOnce.current && productEdges.length) {
      sendViewItemListEvent()

      viewedOnce.current = true
    }
  }, [inView, productEdges.length, sendViewItemListEvent])

  if (products?.edges.length === 0) {
    return null
  }

  return (
    <Section
      className={`layout__section ${withDivisor ? 'section__divisor' : ''} ${
        noMargins ? 'section__no-margins' : ''
      } ${otherBackground ? 'section__other-background' : ''}`}
      style={{ marginTop: 0 }}
      ref={ref}
    >
      <div
        data-fs-product-shelf
        data-fs-shelftype={shelfType === 'isRowLayout' ? 'shelf--row' : 'false'}
        className={`${styles.fsProductShelf}`}
      >
        <ProductShelfSkeleton loading={products === undefined}>
          <div
            data-fs-product-shelf-items
            data-fs-shelftype={
              shelfType === 'isRowLayout' ? 'shelf--row' : 'false'
            }
            className="layout__content"
          >
            {shelfType === 'isCarousel' ? (
              <KeenSlider
                arrows={!isMobile}
                dots
                breakpoints={{ desktop: 6, tablet: 3, phone: 1.5 }}
              >
                {productEdges.map((product, idx: number) => (
                  <div
                    className={`keen-slider__slide number-slide${idx}`}
                    key={`${product.node.id}`}
                  >
                    <div>
                      <ProductCard
                        product={product.node}
                        index={idx + 1}
                        isSimpleCard={isSimpleCard}
                      />
                    </div>
                  </div>
                ))}
              </KeenSlider>
            ) : (
              <>
                {products?.edges.map((product, idx: number) => (
                  <li key={`${product.node.id}`}>
                    <ProductCard
                      product={product.node}
                      index={idx + 1}
                      rowLayout={shelfType === 'isRowLayout'}
                      isSimpleCard={isSimpleCard}
                    />
                  </li>
                ))}
              </>
            )}
          </div>
        </ProductShelfSkeleton>
      </div>
    </Section>
  )
}

export default ProductShelf
