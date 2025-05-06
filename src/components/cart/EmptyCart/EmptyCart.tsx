import Button from 'src/components/ui/Button'
import EmptyState from 'src/components/ui/EmptyState'
import Icon from 'src/components/ui/Icon'

interface Props {
  /**
   * This function is called when `Start Shopping` button is clicked
   */
  onDismiss: () => void
}

function EmptyCart({ onDismiss }: Props) {
  return (
    <EmptyState>
      <header data-fs-empty-state-title>
        <Icon name="ShoppingCart" width={56} height={56} weight="thin" />
        <p>Carrinho vazio</p>
      </header>
      <Button onClick={onDismiss} variant="secondary">
        Começar a comprar
      </Button>
    </EmptyState>
  )
}

export default EmptyCart
