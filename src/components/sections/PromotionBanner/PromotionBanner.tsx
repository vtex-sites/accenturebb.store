import Section from 'src/components/sections/Section'

export interface PromotionBannerProps {
  src: string
  title?: string
  href: string
  linkText?: string
}

const PromotionBanner = ({
  src,
  title,
  href,
  linkText,
}: PromotionBannerProps) => {
  return (
    <Section className="layout__content container__margin">
      <a
        className="background"
        style={{ backgroundImage: `url(${src})` }}
        href={href}
      >
        {title && <h2 className="title">{title}</h2>}
        {linkText && <div className="button-link">{linkText}</div>}
      </a>
    </Section>
  )
}

export default PromotionBanner
