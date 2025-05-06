import { Button } from '@faststore/ui'
import Image from 'next/image'

import Link from 'src/components/ui/Link'
import KeenSlider from 'src/components/custom-components/KeenSlider/KeenSlider'

import Section from '../Section'

export interface BlogSectionAllItems {
  allItems: BlogSectionProps[]
}
export interface BlogSectionProps {
  src: string
  alt: string
  btnHref?: string
  primaryText?: string
  secondaryText?: string
  btnText?: string
  width: string
  height: string
}

const BlogSection = ({ allItems }: BlogSectionAllItems) => {
  const height = parseInt(allItems[0]?.height, 10)

  return (
    <Section
      style={{
        height: `${(height as number) + 235}px`,
      }}
    >
      <KeenSlider dots breakpoints={{ desktop: 3, tablet: 2, phone: 1 }}>
        {allItems.map((card: BlogSectionProps, index: number) => (
          <div
            className={`keen-slider__slide number-slide${index}`}
            style={{ textAlign: '-webkit-center' }}
            key={index}
          >
            <div className="blogSection__container">
              <Image
                src={card.src}
                alt={card.alt}
                loading="lazy"
                width={parseInt(card.width, 10)}
                height={parseInt(card.height, 10)}
              />
              {card.primaryText && (
                <p className="blogSection__primaryText">{card.primaryText}</p>
              )}
              {card.secondaryText && (
                <p className="blogSection__secundaryText">
                  {card.secondaryText}
                </p>
              )}
              {card.btnText && card.btnHref && (
                <Link as="a" href={card.btnHref} target="_blank">
                  <Button className="blogSection__button">
                    {card.btnText}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </KeenSlider>
    </Section>
  )
}

export default BlogSection
