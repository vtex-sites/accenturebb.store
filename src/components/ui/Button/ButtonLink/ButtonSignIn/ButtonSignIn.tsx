import { ButtonLink } from 'src/components/ui/Button'
import styles from 'src/components/ui/Button/button.module.scss'
import { useSession } from 'src/sdk/session'

const ButtonSignIn = () => {
  const { person } = useSession()

  return (
    <ButtonLink
      data-fs-button-signin-link
      href={person?.id ? '/account' : '/login'}
      className={`${styles.fsButton} text__title-mini`}
      variant="tertiary"
    >
      <span>{person?.id ? 'Minha conta' : 'Entrar'}</span>
    </ButtonLink>
  )
}

export default ButtonSignIn
