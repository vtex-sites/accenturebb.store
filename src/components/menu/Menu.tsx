import type { Dispatch, SetStateAction } from 'react'
import { useEffect } from 'react'

import { MenuGetCategory } from './MenuGetCategory'

interface MenuProps {
  isOpen: boolean
  menuIsOpen: Dispatch<SetStateAction<boolean>>
}

const Menu = ({ menuIsOpen, isOpen }: MenuProps) => {
  const modalOpen = isOpen

  useEffect(() => {
    if (modalOpen) {
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    } else {
      document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    }
  }, [modalOpen])

  return (
    <div className={`menu ${isOpen ? 'open' : 'closed'}`}>
      <div className="arrow" />
      <MenuGetCategory stateChanger={menuIsOpen} isOpen={isOpen} />
    </div>
  )
}

export default Menu
