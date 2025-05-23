import { useEffect } from 'react'
import { NextSeo } from 'next-seo'

import storeConfig from '../../store.config'

function Page() {
  useEffect(() => {
    window.location.href = storeConfig.accountUrl
  }, [])

  return (
    <>
      <NextSeo noindex nofollow />

      <div>carregando...</div>
    </>
  )
}

export default Page
