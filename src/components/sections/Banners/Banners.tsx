import Image from 'next/image'

import KeenSlider from 'src/components/custom-components/KeenSlider/KeenSlider'
import Button from 'src/components/ui/Button'
import Link from 'src/components/ui/Link'
import useIsMobile from 'src/data/hook/useIsMobile'

import Section from '../Section'

export interface BannersProps {
  banners: BannerProps[]
}

export interface BannerProps {
  src: string
  href?: string
  alt?: string
  title?: string
  subTitle?: string
  buttonText?: string
  color?: string
  height: number
}
function Banners({ banners }: BannersProps) {
  const regexp = new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')
  const isMobile = useIsMobile()

  return (
    <Section
      data-main-banner
      style={{
        height: `${banners[0].height}px`,
      }}
    >
      <KeenSlider
        full
        arrows={!isMobile}
        dots
        breakpoints={{ desktop: 1, tablet: 1, phone: 1 }}
      >
        {banners.map((banner: BannerProps, index: number) => (
          <div
            className={`keen-slider__slide number-slide${index} `}
            key={index}
          >
            <div data-banner-container style={{ height: `${banner.height}px` }}>
              <Link data-banner-link href={banner.href ? banner.href : '/#'}>
                <Image
                  src={banner.src}
                  alt={banner.alt ? banner.alt : 'Banner Home'}
                  loading="eager"
                  layout="fill"
                  className="image__temporary"
                  priority
                />
                <div
                  data-banner-info
                  style={{
                    ['--color' as any]: `${
                      banner.color && regexp.test(banner.color)
                        ? banner.color
                        : '#FFFFFF'
                    }`,
                    height: `${banner.height}px`,
                  }}
                >
                  {banner.title && (
                    <span data-banner-info-title>{banner.title}</span>
                  )}
                  {banner.subTitle && (
                    <span data-banner-info-sub-title>{banner.subTitle}</span>
                  )}
                  {banner.buttonText && (
                    <Button data-banner-info-button>{banner.buttonText}</Button>
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </KeenSlider>
    </Section>
  )
}

export default Banners
