import { Icon as UIIcon, List as UIList } from '@faststore/ui'

import Link from 'src/components/ui/Link'
import { mark } from 'src/sdk/tests/mark'
import Newsletter from 'src/components/sections/Newsletter'

import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from '../../../images/footer/icons'
import FooterLinks from './FooterLinks'

function Footer() {
  return (
    <footer>
      <div className="footer layout__content-full">
        <div className="footer__section layout__content">
          <section className="footer__newsLetter">
            <Newsletter title="Junte-se ao Club Lacoste" />
            <UIList>
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
                  href="https://www.twitter.com/"
                  title="Pinterest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <UIIcon component={<Twitter />} />
                </Link>
              </li>
              <li>
                <Link
                  as="a"
                  href="https://www.youtube.com/"
                  title="Pinterest"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <UIIcon component={<Youtube />} />
                </Link>
              </li>
            </UIList>
            <section className="footer__find--store hidden-mobile">
              <p className="text__title-mini footer__titles">
                65 LOJAS NO BRASIL
              </p>
              <Link href="/">
                <span>Encontrar um loja</span>
              </Link>
            </section>
          </section>
          <FooterLinks />
          <section className="footer__contacts hidden-mobile">
            <p className="text__title-mini footer__titles">AJUDA & CONTATO</p>
            <p className="text__title-mini footer__titles">FAQ</p>
            <p className="text__title-mini footer__titles">POR TELEFONE</p>
            <div className="contactContainer">
              <p>(11) 4003-1608 *</p>
              <p>
                Nosso serviço de atendimento ao consumidor está disponível para
                atendê-lo de segunda a sexta-feira das 9h às 18h.
              </p>
              <p>
                **O valor da ligação pode variar de acordo com a sua localização
                e operadora telefônica
              </p>
            </div>
            <p className="text__title-mini footer__titles">
              ABRA SUA SOLICITAÇÃO
            </p>
          </section>
        </div>
      </div>
      <div className="layout__content">
        <ul className="footer__bottom--link">
          <li>
            <Link href="/">Mapa da página</Link>
          </li>
          <li>
            <Link href="/">Créditos</Link>
          </li>
          <li>
            <Link href="/">Termos e Condições</Link>
          </li>
          <li>
            <Link href="/">Política de privacidade</Link>
          </li>
          <li>
            <Link href="/">Guia de tamanhos</Link>
          </li>
          <li>
            <Link href="/">Definições de Cookies</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default mark(Footer)
