import type { ContentData } from '@vtex/client-cms'
import type { ComponentType } from 'react'
import { useEffect, useState } from 'react'

import type { MenuCategoryQueryQuery } from '@generated/graphql'
import RenderPageSections from 'src/components/cms/RenderPageSections'
import type {
  CategoryImageAllItemsProps,
  CategoryImageProps,
} from 'src/components/sections/CategoryImage/CategoryImage'
import Link from 'src/components/ui/Link'
import useCategories from 'src/data/hook/useCategories'
import CategoryImage from 'src/components/sections/CategoryImage/CategoryImage'

import styles from './category-buttons.module.scss'

interface CategoryButtonsProps {
  categoryImage: ContentData
  page?: string
  title?: string
}

type CmsCategoryImageSectionsProps = Array<{
  data: CategoryImageProps
  name: string
}>

interface SubCategoryProps {
  data: MenuCategoryQueryQuery
  page: string
}

interface OtherButtonsProps {
  name: string
  item: string
}

interface NoImageProps {
  name: string
  item: string
  position: number
}

const COMPONENTS: Record<string, ComponentType<any>> = {
  CategoryImage,
}

const getCategory = ({
  categoryImage,
  page,
  title,
  allCollections,
}: CategoryButtonsProps & MenuCategoryQueryQuery) => {
  const category = allCollections.edges
    .filter(
      (el) =>
        el.node.type === 'Category' &&
        el.node.breadcrumbList.itemListElement[0].item === page &&
        el.node.breadcrumbList.itemListElement.length < 3
    )
    .flat()
    .map((el) => el.node.breadcrumbList.itemListElement[1])

  const cmsImageCategorySection =
    categoryImage.sections as CmsCategoryImageSectionsProps

  const cmsImageCategory = cmsImageCategorySection.filter(
    (el) => el.data.department === title && el.name === 'CategoryImage'
  )

  const categoryCms = category.reduce(
    (categories: CategoryImageAllItemsProps[], cat) => {
      const cmsCategory: CategoryImageAllItemsProps[] = []

      cmsImageCategory.forEach((element) => {
        const getCmsCategory = element.data.allItems.find(
          (item) => item.category === cat.name
        )

        if (getCmsCategory) {
          getCmsCategory.link = cat.item
          cmsCategory.push(getCmsCategory)
        }
      })

      if (cmsCategory) {
        return [...categories, ...cmsCategory]
      }

      return [
        ...categories,
        { src: '', alt: '', link: cat.item, category: cat.name },
      ]
    },
    []
  )

  if (categoryCms.length > 0) {
    const allItems = categoryCms.flat()

    return [
      {
        name: 'CategoryImage',
        data: { allItems: [...allItems], department: title },
      },
    ]
  }

  return []
}

const noCategoryImage = ({
  data: { allCollections },
  page,
}: SubCategoryProps) => {
  const subCategory = allCollections.edges.filter(
    (el) =>
      el.node.type === 'Category' &&
      el.node.breadcrumbList.itemListElement[0].item === page &&
      el.node.breadcrumbList.itemListElement.length === 2
  )

  return subCategory.map((el) => el.node.breadcrumbList.itemListElement[1])
}

const getSubCategory = ({
  data: { allCollections },
  page,
}: SubCategoryProps) => {
  const subCategory = allCollections.edges.filter(
    (el) =>
      el.node.type === 'Category' &&
      el.node.breadcrumbList.itemListElement[1].item === page &&
      el.node.breadcrumbList.itemListElement.length === 3
  )

  return subCategory.map((el) => el.node.breadcrumbList.itemListElement[2])
}

const CategoryButtons = ({
  categoryImage,
  page,
  title,
}: CategoryButtonsProps) => {
  const [departButtons, setDepartButtons] =
    useState<CmsCategoryImageSectionsProps>()

  const [otherButtons, setOtherButtons] = useState<NoImageProps[]>()
  const [isDepartment, setIsDepartment] = useState(false)
  const data = useCategories()
  const { categories } = { ...data }

  useEffect(() => {
    if (page && categories) {
      const checkDepartment = categories.allCollections.edges.find(
        (el) =>
          el.node.type === 'Department' &&
          el.node.breadcrumbList.itemListElement[0].item === page
      )

      if (checkDepartment) setIsDepartment(true)
      else setIsDepartment(false)
    }
  }, [isDepartment, page, categories, title])

  useEffect(() => {
    if (isDepartment && page && categories) {
      const category = getCategory({
        categoryImage,
        page,
        title,
        allCollections: categories.allCollections,
      })

      if (category.length > 0) setDepartButtons(category)
      else {
        setOtherButtons(noCategoryImage({ data: categories, page }))
        setDepartButtons([])
      }
    }
  }, [page, categories, isDepartment, title, categoryImage])

  useEffect(() => {
    if (!isDepartment && page && categories) {
      const sub = getSubCategory({
        page,
        data: categories,
      })

      setOtherButtons(sub)
    }
  }, [page, categories, isDepartment])

  return (
    <div className={styles.fsCategoryButtons}>
      <div className="layout__content" data-fs-category-buttons-content>
        {departButtons !== undefined && departButtons.length > 0 ? (
          <div data-fs-category-buttons-type-image>
            <RenderPageSections
              sections={departButtons}
              components={COMPONENTS}
            />
          </div>
        ) : (
          <div data-fs-category-buttons-type-text>
            {otherButtons?.map(({ item, name }: OtherButtonsProps, index) => (
              <Link href={item} key={index}>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryButtons
