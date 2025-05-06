import { NextSeo, SiteLinksSearchBoxJsonLd } from 'next-seo'
import type { GetStaticProps } from 'next'
import type { Locator } from '@vtex/client-cms'
import type { ComponentType } from 'react'

import CUSTOM_SECTIONS from 'src/customizations'
import { mark } from 'src/sdk/tests/mark'
import { getPage } from 'src/server/cms'
import type { PageContentType } from 'src/server/cms'
import RenderPageSections from 'src/components/cms/RenderPageSections'
import Hero from 'src/components/sections/Hero'
import BannerText from 'src/components/sections/BannerText'
import IncentivesHeader from 'src/components/sections/Incentives/IncentivesHeader'
import ProductShelf from 'src/components/sections/ProductShelf'
import ProductTiles from 'src/components/sections/ProductTiles'
import Banners from 'src/components/sections/Banners'
import Title from 'src/components/sections/Title/Title'
import CategorySection from 'src/components/sections/CategorySection'
import BrandSection from 'src/components/sections/BrandSection'
import BlogSection from 'src/components/sections/BlogSection'
import PromotionBanner from 'src/components/sections/PromotionBanner'
import Incentives from 'src/components/sections/Incentives'
import ImageBanner from 'src/components/sections/ImageBanner'

import storeConfig from '../../store.config'

/**
 * Sections: Components imported from '../components/sections' only.
 * Sections: Components imported from each store's custom components and '../components/sections'.
 * Do not import or render components from any other folder in here.
 */

const COMPONENTS: Record<string, ComponentType<any>> = {
  Hero,
  BannerText,
  IncentivesHeader,
  ProductShelf,
  ProductTiles,
  Banners,
  Title,
  CategorySection,
  BrandSection,
  BlogSection,
  PromotionBanner,
  Incentives,
  ImageBanner,
  ...CUSTOM_SECTIONS,
}

type Props = PageContentType

function Page({ sections, settings }: Props) {
  return (
    <>
      {/* SEO */}
      <NextSeo
        title={settings?.seo.title}
        description={settings?.seo.description}
        titleTemplate={storeConfig.seo.titleTemplate}
        canonical={settings?.seo.canonical ?? storeConfig.storeUrl}
        openGraph={{
          type: 'website',
          url: storeConfig.storeUrl,
          title: settings?.seo.title,
          description: settings?.seo.description,
        }}
      />
      <SiteLinksSearchBoxJsonLd
        url={storeConfig.storeUrl}
        potentialActions={[
          {
            target: `${storeConfig.storeUrl}/s/?q={search_term_string}`,
            queryInput: 'required name=search_term_string',
          },
        ]}
      />

      {/*
        WARNING: Do not import or render components from any
        other folder than '../components/sections' in here.

        This is necessary to keep the integration with the CMS
        easy and consistent, enabling the change and reorder
        of elements on this page.

        If needed, wrap your component in a <Section /> component
        (not the HTML tag) before rendering it here.
      */}
      <RenderPageSections sections={sections} components={COMPONENTS} />
    </>
  )
}

export const getStaticProps: GetStaticProps<
  Props,
  Record<string, string>,
  Locator
> = async (context) => {
  const page = await getPage<PageContentType>({
    ...(context.previewData?.contentType === 'page'
      ? context.previewData
      : { filters: { 'settings.seo.slug': '/' } }),
    contentType: 'home',
  })

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: page,
  }
}

Page.displayName = 'Page'
export default mark(Page)
