import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import {
  BackwardArrowIcon,
  ForwardArrowIcon,
} from 'src/components/ui/ImageGallery/Icons'
import Link from 'src/components/ui/Link'

import type { DepartProps } from '../desktop/MenuDesktop'

interface MenuMobileProps {
  isOpen: boolean
  items: DepartProps[]
  stateChanger: Dispatch<SetStateAction<boolean>>
}

const MenuMobile = ({ stateChanger, isOpen, items }: MenuMobileProps) => {
  const [firstLevel, setFirstLevel] = useState(true)
  const [secondLevel, setSecondLevel] = useState(false)
  const [active, setActive] = useState(0)

  const nextLevel = (index: number) => {
    setActive(index + 1)
    setFirstLevel(false)
    setSecondLevel(true)
  }

  const previousLevel = () => {
    setActive(0)
    setSecondLevel(false)
    setFirstLevel(true)
  }

  return (
    <div className={`menu-container ${isOpen ? 'open' : 'closed'}`}>
      <div className="arrow" />
      <div className={`first-level ${firstLevel ? 'open' : 'closed'}`}>
        <nav>
          <ul>
            {items.map(({ department, categories }, index: number) => (
              <li key={index}>
                <Link
                  onClick={() => stateChanger(false)}
                  href={`${department.item}`}
                >
                  {department.name}
                </Link>
                {categories.length > 0 ? (
                  <button onClick={() => nextLevel(index)}>
                    <ForwardArrowIcon color="#ffffff" />
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {items.map(({ department, categories }, idx: number) => (
        <div
          key={`category-${department.name}`}
          className={`second-level ${
            secondLevel && active === idx + 1 ? 'open' : 'closed'
          }`}
        >
          <button onClick={() => previousLevel()}>
            <BackwardArrowIcon color="#ffffff" />
            <span> {department.name}</span>
          </button>
          <nav>
            <ul>
              {categories.map(({ category }, i: number) => (
                <li key={i}>
                  <Link
                    onClick={() => stateChanger(false)}
                    href={`${category.item}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ))}
    </div>
  )
}

export default MenuMobile
