import {
  Icon as UIIcon,
  List as UIList,
  PaymentMethods as UIPaymentMethods,
} from '@faststore/ui'
import Image from 'next/image'

import Newsletter from 'src/components/sections/Newsletter'
import Button from 'src/components/ui/Button'
import Link from 'src/components/ui/Link'
import SROnly from 'src/components/ui/SROnly'
import { mark } from 'src/sdk/tests/mark'

import {
  Visa,
  Master,
  Amex,
  Dinners,
  Ligar,
  Enviar,
  Facebook,
  Instagram,
  Twitter,
} from '../../../images/footer/icons'
import FooterLinks from './FooterLinksLean'

function Footer() {
  return (
    <>
      <Newsletter lite title="Receba notícias e ofertas especiais!" />

      <footer className="footer layout__content-full">
        <div className="footer__section layout__content">
          <FooterLinks />
          <section className="footer__contacts hidden-mobile">
            <p className="text__title-mini footer__titles">Contatos</p>
            <div className="contactContainer">
              <Button
                className="btn btnLigar"
                iconPosition="left"
                icon={<Ligar />}
              >
                {' '}
                Ligar{' '}
              </Button>
              <Button
                className="btn btnMsg"
                iconPosition="left"
                icon={<Enviar />}
              >
                {' '}
                Envie uma Mensagem{' '}
              </Button>
              <p>
                <Link href="/">Clique Aqui</Link> para ver as nossas horas de
              </p>
              <p> funcionamento</p>
            </div>
          </section>
          <section className="footer__social">
            <div className="footer__container--column">
              <UIPaymentMethods>
                <p className="text__title-mini footer__titles footer__titles--payment">
                  Pague com os cartões
                </p>
                <UIList className="footer__paymentMethod--ul">
                  <li>
                    <UIIcon component={<Visa />} />
                    <SROnly text="Visa" />
                  </li>
                  <li>
                    <UIIcon component={<Dinners />} />
                    <SROnly text="Diners Club" />
                  </li>
                  <li>
                    <UIIcon component={<Master />} />
                    <SROnly text="Mastercard" />
                  </li>
                  <li>
                    <UIIcon component={<Amex />} />
                    <SROnly text="Amex" />
                  </li>
                </UIList>
              </UIPaymentMethods>
              <p className="text__title-mini footer__titles footer__titles--social">
                Siga nas redes sociais
              </p>
              <UIList data-fs-social-icon>
                <li>
                  <Link
                    as="a"
                    href="https://www.facebook.com/"
                    title="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <UIIcon component={<Facebook />} />
                  </Link>
                </li>
                <li>
                  <Link
                    as="a"
                    href="https://www.instagram.com/"
                    title="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <UIIcon component={<Instagram />} />
                  </Link>
                </li>
                <li>
                  <Link
                    as="a"
                    href="https://www.twitter.com/"
                    title="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <UIIcon component={<Twitter />} />
                  </Link>
                </li>
              </UIList>
            </div>
          </section>
        </div>
        <div className="display-mobile">
          <div className="layout__content footer__note--mob--content">
            <FooterTitle />
            <FooterText />
            <FooterLogo />
          </div>
        </div>
        <div className="hidden-mobile ">
          <div className="layout__content footer__note--desk--content">
            <FooterLogo /> <FooterTitle />
          </div>
          <div className="layout__content">
            <FooterText />
          </div>
        </div>
      </footer>
    </>
  )
}

function FooterLogo() {
  return (
    <div className="">
      <div className="">
        <UIIcon
          component={
            <Image
              src="/logo-footer.svg"
              alt="BaseStore logo"
              width={124}
              height={32}
              loading="lazy"
            />
          }
        />
      </div>
    </div>
  )
}

function FooterTitle() {
  return (
    <div className="">
      <span className="footer__note--text">
        ACCENTURE 2021 @ All rights reserved
      </span>
    </div>
  )
}

function FooterText() {
  return (
    <div className="">
      <div className="footer__copyright / text__legend">
        <p className="footer__note--text">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don&apos;t look even slightly
          believable. If you are going to use a passage of Lorem Ipsum, you need
          to be sure there isn&apos;t anything embarrassing hidden in the middle
          of text. All the Lorem Ipsum generators on the Internet tend to repeat
          predefined chunks as necessary, making this the first true generator
          on the Internet. It uses a dictionary of over 200 Latin words,
          combined with a handful of model sentence structures, to generate
          Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
          therefore always free from repetition, injected humour, or
          non-characteristic words etc
        </p>
      </div>
    </div>
  )
}

Footer.displayName = 'Footer'

export default mark(Footer)
