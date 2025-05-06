import { useEffect, useState } from 'react'

const useCmsPage = (name: string) => {
  // TODO type it
  const [cmsPage, setCmsPage] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/getCmsPage/${name}`)
      .then((response) => response.json())
      .then((data) => setCmsPage(data[0]))
  }, [name])

  return cmsPage
}

export default useCmsPage
