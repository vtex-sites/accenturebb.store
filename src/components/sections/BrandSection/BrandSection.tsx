import InfoCard from 'src/components/custom-components/home/InfoCard'
import KeenSlider from 'src/components/custom-components/KeenSlider/KeenSlider'
import Section from 'src/components/sections/Section'

export interface BrandSectionProps {
  src: string
  alt: string
  href: string
  width: string
  height: string
}

export interface BrandSectionAllItems {
  allItems: BrandSectionProps[]
}

const BrandSection = ({ allItems }: BrandSectionAllItems) => {
  return (
    <Section data-fs-brand-section>
      <KeenSlider dots breakpoints={{ desktop: 5, tablet: 3, phone: 1 }}>
        {allItems.map((card: BrandSectionProps, index: number) => (
          <div
            className={`keen-slider__slide number-slide${index}`}
            style={{ textAlign: '-webkit-center' }}
            key={index}
          >
            <InfoCard
              key={index}
              href={card.href}
              src={card.src}
              alt={card.alt}
              width={card.width}
              height={card.height}
              className="classSection__brand"
            />
          </div>
        ))}
      </KeenSlider>
    </Section>
  )
}

export default BrandSection
