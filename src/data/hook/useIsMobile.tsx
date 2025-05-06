import { useEffect, useState } from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    if (window.innerWidth > 920) {
      setIsMobile(false)
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) {
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    })
  }, [isMobile])

  return isMobile
}

export default useIsMobile
