import { List as UIList } from '@faststore/ui'
import type { AnchorHTMLAttributes, ComponentType } from 'react'

import RenderPageSections from 'src/components/cms/RenderPageSections'
import { mark } from 'src/sdk/tests/mark'
import RegionalizationBar from 'src/components/regionalization/RegionalizationBar'
import HeaderLink from 'src/components/sections/HeaderLink/HeaderLink'

import styles from './navlinks.module.scss'
import useCmsPage from '../../../data/hook/useCmsPage'

interface NavLinksProps {
  onClickLink?: AnchorHTMLAttributes<HTMLAnchorElement>['onClick']
  classes?: string
}

const COMPONENTS: Record<string, ComponentType<any>> = {
  HeaderLink,
}

function NavLinks({ classes = '' }: NavLinksProps) {
  const cmsHeaderLink = useCmsPage('HeaderLink')

  return (
    <nav
      className={`${styles.fsNavlinks} ${classes}`}
      style={{ height: '48px' }}
    >
      <RegionalizationBar
        data-fs-nav-regionalization
        classes="region hidden-mobile"
      />
      <UIList data-fs-navlinks-list>
        <RenderPageSections
          sections={cmsHeaderLink?.sections}
          components={COMPONENTS}
        />
      </UIList>
    </nav>
  )
}

export default mark(NavLinks)
