import Image from 'next/image'

import KeenSlider from 'src/components/custom-components/KeenSlider/KeenSlider'
import Icon from 'src/components/ui/Icon'
import Link from 'src/components/ui/Link'

import styles from './category-image.module.scss'

export interface CategoryImageProps {
  allItems: CategoryImageAllItemsProps[]
  department?: string
}
export interface CategoryImageAllItemsProps {
  alt: string
  category: string
  src: string
  link: string
}

const CategoryImage = ({ allItems, department }: CategoryImageProps) => {
  return (
    <div className={`${department} category-image ${styles.fsCategoryImage}`}>
      <KeenSlider arrows dots breakpoints={{ desktop: 8, tablet: 5, phone: 2 }}>
        {allItems.map((el, index) => {
          const link = el.link ? el.link : '/'

          return (
            <div
              className={`keen-slider__slide number-slide${index}`}
              style={{ textAlign: '-webkit-center' }}
              key={index}
            >
              <div data-fs-category-image-content>
                <Link href={link}>
                  {el.src ? (
                    <Image
                      data-fs-category-image-image
                      src={el.src}
                      alt={el.alt ?? `${el.category} image`}
                      width={94}
                      height={94}
                    />
                  ) : (
                    <Icon name="empty__category" width="94" height="94" />
                  )}
                  <span data-fs-category-image-category>{el.category}</span>
                </Link>
              </div>
            </div>
          )
        })}
      </KeenSlider>
    </div>
  )
}

export default CategoryImage
