import Link from 'src/components/ui/Link'
import Section from 'src/components/sections/Section'

export interface SectionTitleProps {
  title: string
  href?: string
  linkText?: string
  border?: boolean
  description?: string
  className?: string
}

const SectionTitle = ({
  title,
  href,
  linkText,
  border,
  description,
  className,
}: SectionTitleProps) => {
  return (
    <Section className={`${className ?? 'section__title'}`}>
      <div
        className={`layout__content classSection__title--content ${
          border ? 'border--active' : ''
        } ${className ?? ''}`}
      >
        <span className={`classSection__title ${className ?? ''}`}>
          {title}
        </span>
        {href && linkText && (
          <Link href={href}>
            <span className="classSection__link ">{linkText}</span>
          </Link>
        )}
        {description && (
          <span className="layout__content classSection__description">
            {description}
          </span>
        )}
      </div>
    </Section>
  )
}

export default SectionTitle
