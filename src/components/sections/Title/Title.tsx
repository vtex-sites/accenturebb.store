import SectionTitle from 'src/components/custom-components/home/SectionTitle'

import Section from '../Section'

export interface TitleProps {
  titleSection: string
  linkText: string
  link: string
  border: boolean
  otherBackground: boolean
}

function Title({
  titleSection,
  linkText,
  link,
  border,
  otherBackground,
}: TitleProps) {
  return (
    <Section>
      <div
        className={`${
          otherBackground ? 'section__other-background' : ''
        } title`}
        style={{ height: '65px' }}
      >
        <SectionTitle
          title={titleSection}
          href={link}
          linkText={linkText}
          border={border}
        />
      </div>
    </Section>
  )
}

export default Title
