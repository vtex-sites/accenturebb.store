import Image from 'next/image'

import Section from 'src/components/sections/Section'

export interface ImageBannerProps {
  src: string
  alt?: string
  fullWidth?: boolean
  height?: number
}

const ImageBanner = ({ src, alt, fullWidth, height }: ImageBannerProps) => {
  return (
    <>
      {!fullWidth ? (
        <Section
          className="layout__content container__margin"
          style={{
            height: `${height}px`,
            display: 'block',
            position: 'relative',
          }}
        >
          <Image
            loading="eager"
            className="image__temporary"
            src={src}
            alt={alt}
            layout="fill"
          />
        </Section>
      ) : (
        <Section
          className="layout__content-full"
          style={{
            height: `${height}px`,
            display: 'block',
            position: 'relative',
          }}
        >
          <Image
            className="image__temporary"
            src={src}
            alt={alt}
            layout="fill"
            loading="eager"
          />
        </Section>
      )}
    </>
  )
}

export default ImageBanner
