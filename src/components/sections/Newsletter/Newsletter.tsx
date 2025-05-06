import type { ComponentPropsWithRef, FormEvent, ReactNode } from 'react'
import { useState, forwardRef, useRef } from 'react'
import { Form } from '@faststore/ui'

import { useUI } from 'src/sdk/ui/Provider'
import Button from 'src/components/ui/Button'
import Link from 'src/components/ui/Link'
import InputText from 'src/components/ui/InputText'

// import { useNewsletter } from 'src/sdk/newsletter/useNewsletter'
import { useNewsletterQuery, useNewsletterQueryUpdate } from './NewsLetterQuery'
import Section from '../Section'
import styles from './newsletter.module.scss'

export interface NewsletterProps
  extends Omit<ComponentPropsWithRef<'form'>, 'title' | 'onSubmit'> {
  /**
   * Title for the section.
   */
  title: ReactNode
  /**
   * A description for the section.
   */
  description?: ReactNode
  /**
   * The card Variant
   */
  card?: boolean
  /**
   * The compact version of the Newsletter component
   */
  lite?: boolean
}

const Newsletter = forwardRef<HTMLFormElement, NewsletterProps>(
  function Newsletter(
    { title, description, card = false, lite = false, ...otherProps },
    ref
  ) {
    const { subscribeUser, loading, data } = useNewsletterQuery()
    const { updateUser } = useNewsletterQueryUpdate()
    const [update, setUpdate] = useState(false)
    const [email, setEmail] = useState('')

    const nameInputRef = useRef<HTMLInputElement>(null)
    const emailInputRef = useRef<HTMLInputElement>(null)

    const { pushToast } = useUI()

    const handleSubmit = (event: FormEvent) => {
      event.preventDefault()

      if (emailInputRef.current?.value) {
        setEmail(emailInputRef.current?.value ?? '')
        subscribeUser({ email: emailInputRef.current?.value })
          .then(() => {
            setUpdate(true)
            pushToast({
              title: 'Eba!',
              message: 'Obrigado por se inscrever!',
              status: 'INFO',
              icon: 'CircleWavyCheck',
            })
          })
          .catch(() => {
            pushToast({
              title: 'Oops.',
              message: 'Ocorreu algo de errado. Tente denovo!',
              status: 'ERROR',
              icon: 'CircleWavyWarning',
            })
          })
      }

      const formElement = event.currentTarget as HTMLFormElement

      formElement.reset()
    }

    if (update === true) {
      const id = data?.newsLetter?.id ?? ''

      setUpdate(false)
      if (email) {
        updateUser({ email, id })
          .then(() => {
            pushToast({
              title: 'Eba!',
              message: 'Obrigado por se inscrever!',
              status: 'INFO',
              icon: 'CircleWavyCheck',
            })
          })
          .catch(() => {
            pushToast({
              title: 'Oops.',
              message: 'Ocorreu algo de errado. Tente denovo!',
              status: 'ERROR',
              icon: 'CircleWavyWarning',
            })
          })
      }

      setEmail('')
    }

    return (
      <Section
        data-fs-newsletter={card ? 'card' : ''}
        className={`layout__section--full ${styles.fsNewsletter}`}
      >
        <Form
          data-fs-newsletter-form
          ref={ref}
          onSubmit={handleSubmit}
          {...otherProps}
          className="layout__content"
        >
          <header data-fs-newsletter-header>
            <h3>{title}</h3>
            {description && <span> {description}</span>}
          </header>

          <div data-fs-newsletter-controls>
            {lite ? (
              <>
                <InputText
                  inputRef={emailInputRef}
                  id="newsletter-email"
                  label="Email"
                  type="email"
                  required
                  actionable
                  onSubmit={() => undefined}
                  onClear={() => undefined}
                  buttonActionText="Enviar"
                  displayClearButton={false}
                />
              </>
            ) : (
              <>
                <InputText
                  inputRef={nameInputRef}
                  id="newsletter-name"
                  label="Your Name"
                  required
                />
                <InputText
                  inputRef={emailInputRef}
                  id="newsletter-email"
                  label="Your Email"
                  type="email"
                  required
                />
                <span data-fs-newsletter-addendum>
                  Ao subscrever a nossa newsletter está a concordar com a nossa{' '}
                  <Link href="/" inverse variant="inline">
                    Política de Privacidade.
                  </Link>
                </span>
                <Button variant="secondary" inverse type="submit">
                  {loading ? 'Loading...' : 'Enviar'}
                </Button>
              </>
            )}
          </div>
        </Form>
      </Section>
    )
  }
)

export default Newsletter
