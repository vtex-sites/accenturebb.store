import RegionalizationInput from 'src/components/regionalization/RegionalizationInput'
import Button from 'src/components/ui/Button'
import Icon from 'src/components/ui/Icon'
import Link from 'src/components/ui/Link'

import styles from './regionalization-modal-content.module.scss'

export type RegionalizationModalContentProps = {
  onClose?: () => void
}

function RegionalizationModalContent({
  onClose,
}: RegionalizationModalContentProps) {
  return (
    <div
      data-fs-regionalization-modal-content
      className={styles.fsRegionalizationModalContent}
    >
      <header data-fs-regionalization-modal-header>
        {onClose && (
          <Button
            onClick={() => onClose?.()}
            data-fs-regionalization-modal-button
            aria-label="Close Regionalization Modal"
            data-testid="regionalization-modal-button-close"
            icon={<Icon name="X" width={30} height={30} />}
          />
        )}
        <p data-fs-regionalization-modal-title>Informe seu CEP</p>
        <p data-fs-regionalization-modal-description>
          Preços, ofertas e disponibilidade podem variar de acordo com sua
          localização.
        </p>
      </header>
      <div data-fs-regionalization-modal-body>
        <div data-fs-regionalization-modal-input>
          <RegionalizationInput closeModal={() => onClose?.()} />
        </div>
        <Link href="/" data-fs-regionalization-modal-link>
          {'Não sei meu CEP'}
          <Icon name="ArrowSquareOut" width={18} height={18} />
        </Link>
      </div>
    </div>
  )
}

export default RegionalizationModalContent
