import type { PropsWithChildren } from 'react'
import { createContext, useEffect, useState } from 'react'

import type { MenuCategoryQueryQuery } from '@generated/graphql'
import useCategoryQuery from 'src/components/menu/useCategoryQuery'

/* eslint-disable vtex/prefer-early-return */

type CategoriesContextProps = {
  categories: MenuCategoryQueryQuery | undefined
}

export const CategoriesContex = createContext<CategoriesContextProps | null>(
  null
)

export const CategoriesProvider = ({ children }: PropsWithChildren) => {
  const [categories, setCategories] = useState<MenuCategoryQueryQuery>()
  const { getAllCategories, data, loading } = useCategoryQuery()

  useEffect(() => {
    getAllCategories({ first: 100 })
  }, [loading])

  useEffect(() => {
    if (data) {
      const allCategories = data?.allCollections.edges.filter(
        (el) => el.node.type !== 'Brand'
      )

      data.allCollections.edges = allCategories
      setCategories(data)
    }
  }, [data])

  return (
    <CategoriesContex.Provider value={{ categories }}>
      {children}
    </CategoriesContex.Provider>
  )
}
