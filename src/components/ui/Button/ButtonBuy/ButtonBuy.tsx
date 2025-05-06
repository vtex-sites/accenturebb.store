import Button from '../Button'
import type { ButtonProps } from '../Button'
import styles from '../button.module.scss'

type Props = ButtonProps

function ButtonBuy({ children, ...otherProps }: Props) {
  return (
    <Button
      className={styles.fsButton}
      data-fs-button
      data-fs-button-buy
      data-fs-button-variant="buy"
      {...otherProps}
    >
      {children}
    </Button>
  )
}

export default ButtonBuy
