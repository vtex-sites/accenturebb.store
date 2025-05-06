import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import useCategories from 'src/data/hook/useCategories'
import useIsMobile from 'src/data/hook/useIsMobile'

import MenuMobile from './mobile/MenuMobile'
import MenuDesktop from './desktop/MenuDesktop'
import GetAllCategory from './GetAllCategory'

interface MenuProps {
  isOpen: boolean
  stateChanger: Dispatch<SetStateAction<boolean>>
}

export interface CategoryProps {
  name: string
  item: string
  position: number
}

export function handleResize() {
  if (window.innerWidth < 920) {
    return true
  }

  return false
}

export const MenuGetCategory = ({ stateChanger, isOpen }: MenuProps) => {
  const isMobile = useIsMobile()

  const data = useCategories()
  const categories = data?.categories

  if (!categories) {
    return <></>
  }

  const {
    allCollections: { edges },
  } = categories

  const depart = GetAllCategory({ edges })

  if (!isMobile) {
    return (
      <>
        {depart && (
          <MenuDesktop
            isOpen={isOpen}
            stateChanger={stateChanger}
            depart={depart}
          />
        )}
      </>
    )
  }

  return (
    <>
      {
        <MenuMobile
          stateChanger={stateChanger}
          isOpen={isOpen}
          items={depart}
        />
      }
    </>
  )
}
