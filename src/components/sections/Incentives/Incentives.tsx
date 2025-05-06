import { Incentive as UIIncentive } from '@faststore/ui'
import Image from 'next/image'

import KeenSlider from 'src/components/custom-components/KeenSlider/KeenSlider'

import styles from './incentives.module.scss'

interface Incentive {
  src: string
  alt?: string
  title?: string
  primaryText: string
  secondaryText?: string
}

export interface IncentivesProps {
  incentives: Incentive[]
  /**
   * Controls whether the component will be colored or not.
   */
  colored?: boolean
  /**
   * Controls the component's direction.
   */
  variant?: 'horizontal' | 'vertical'
}

function Incentives({
  incentives,
  variant = 'horizontal',
  colored = false,
}: IncentivesProps) {
  return (
    <div
      data-fs-incentives
      data-fs-incentives-colored={colored}
      data-fs-incentives-variant={variant}
      className={styles.fsIncentives}
    >
      <KeenSlider dots breakpoints={{ desktop: 4, tablet: 3, phone: 1 }}>
        {incentives.map((incentive, index) => (
          <div
            className={`keen-slider__slide number-slide${index}`}
            style={{ textAlign: '-webkit-center' }}
            key={index}
          >
            <UIIncentive>
              <Image
                src={incentive.src}
                alt={incentive.alt ?? `${incentive.title} icon`}
                loading="lazy"
                data-fs-incentive-icon
                width={32}
                height={32}
              />
              <div data-fs-incentive-content>
                {incentive.title && (
                  <p data-fs-incentive-title>{incentive.title}</p>
                )}
                <span data-fs-incentive-description>
                  {incentive.primaryText}
                </span>
                {incentive.secondaryText && (
                  <span data-fs-incentive-description>
                    {incentive.secondaryText}
                  </span>
                )}
              </div>
            </UIIncentive>
          </div>
        ))}
      </KeenSlider>
    </div>
  )
}

export default Incentives
