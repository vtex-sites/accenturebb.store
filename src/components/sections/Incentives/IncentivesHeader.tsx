import Incentives from './Incentives'
import Section from '../Section'

interface Incentive {
  src: string
  alt?: string
  title?: string
  primaryText: string
  secondaryText?: string
}

interface Props {
  incentives: Incentive[]
}

function IncentivesHeader({ incentives }: Props) {
  return (
    <Section>
      <Incentives incentives={incentives} colored />
    </Section>
  )
}

export default IncentivesHeader
