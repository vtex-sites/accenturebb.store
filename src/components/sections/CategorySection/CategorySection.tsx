import InfoCard from 'src/components/custom-components/home/InfoCard'
import Section from 'src/components/sections/Section'
import useIsMobile from 'src/data/hook/useIsMobile'

export interface CategorySectionAllItems {
  allItems: CategorySectionProps[]
}
export interface CategorySectionProps {
  src: string
  alt: string
  href: string
  width: string
  height: string
  text?: string
}

const CategorySection = ({ allItems }: CategorySectionAllItems) => {
  const isMobile = useIsMobile()

  return (
    <Section
      style={{
        height: 'auto',
      }}
    >
      <div
        className="layout__content classSection__container category-session"
        data-fs-category-section
        style={{
          ['--mobile' as any]: `${!isMobile ? 'space-between' : 'center'}`,
        }}
      >
        {allItems.map((card: CategorySectionProps, index: number) => (
          <InfoCard
            key={index}
            href={card.href}
            src={card.src}
            alt={card.alt ?? `${card.text} image`}
            width={card.width}
            height={card.height}
            text={card.text}
          />
        ))}
      </div>
    </Section>
  )
}

export default CategorySection
