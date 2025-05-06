import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'

import Link from 'src/components/ui/Link/Link'

import styles from './menu-desktop.module.scss'

interface MenuItemsProps {
  item: string
  name: string
  position: number
}

export interface DepartProps {
  department: MenuItemsProps
  categories: Array<{
    category: MenuItemsProps
    subCategory: MenuItemsProps[]
  }>
}
interface MenuDesktopProps {
  depart: DepartProps[]
  stateChanger: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}

const MenuDesktop = ({ depart, stateChanger, isOpen }: MenuDesktopProps) => {
  const [active, setActive] = useState(1)

  useEffect(() => {
    setActive(1)
  }, [isOpen])

  return (
    <div className={styles.fsMenuDesktop}>
      <nav data-fs-categories-field>
        <ul data-menu-category>
          {depart.map(({ department }, idx) => (
            <li
              key={`category--${idx}`}
              data-fs-category-active={active === idx + 1}
            >
              <button onClick={() => setActive(idx + 1)}>
                <span>{department.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div data-fs-subcategories-field>
        <ul data-menu-sub-category>
          {depart.map(({ department, categories }, id: number) => (
            <li
              key={`category--${id}`}
              data-fs-subcategories-active={active === id + 1}
            >
              <h2>
                <Link
                  href={department.item}
                  onClick={() => stateChanger(false)}
                >
                  {department.name}
                </Link>
              </h2>
              <nav>
                {categories?.map(({ category, subCategory }, index: number) => (
                  <div key={`subCategory--${index}`}>
                    <h3>
                      <Link
                        onClick={() => stateChanger(false)}
                        href={category.item}
                      >
                        {category.name}
                      </Link>
                    </h3>
                    {subCategory?.map(({ name, item }, i: number) => (
                      <Link
                        onClick={() => stateChanger(false)}
                        key={`subSubCategory--${i}`}
                        href={item}
                        data-fs-subcategory
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                ))}
              </nav>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MenuDesktop
