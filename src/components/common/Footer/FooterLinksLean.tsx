import { List as UIList } from '@faststore/ui'

import Link from 'src/components/ui/Link'

const mobileLinks = [
  {
    items: [
      {
        href: '/',
        name: 'Sobre nós',
      },
      {
        href: '/',
        name: 'Seus pedidos',
      },
      {
        href: '/',
        name: 'Informações de envio',
      },
    ],
  },
  {
    items: [
      {
        href: '/',
        name: 'Politica de Devolução',
      },
      {
        href: '/',
        name: 'Serviço ao cliente',
      },
      {
        href: '/',
        name: 'Contato e Suporte',
      },
    ],
  },
]

const links = [
  {
    title: 'Sobre nós',
    items: [
      {
        href: '/',
        name: 'Nossa empresa',
      },
      {
        href: '/',
        name: 'Carreiras',
      },
      {
        href: '/',
        name: 'Venda com a Accenture',
      },
      {
        href: '/',
        name: 'Relações com Investidores',
      },
      {
        href: '/',
        name: 'Anuncie conosco',
      },
      {
        href: '/',
        name: 'Localizações',
      },
    ],
  },
  {
    title: 'Serviço ao cliente',
    items: [
      {
        href: '/',
        name: 'Centro de ajuda',
      },
      {
        href: '/',
        name: 'Devoluções',
      },
      {
        href: '/',
        name: 'Recolhimentos de produtos',
      },
      {
        href: '/',
        name: 'Opções de entrega',
      },
      {
        href: '/',
        name: 'Opções de pagamento',
      },
    ],
  },
]

type LinkItem = {
  href: string
  name: string
}

interface LinksListProps {
  items: LinkItem[]
}

function LinksList({ items }: LinksListProps) {
  return (
    <UIList>
      {items.map((item) => (
        <li key={item.name}>
          <Link
            // className="footer__links--link"
            variant="footer"
            href={item.href}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </UIList>
  )
}

function FooterLinks() {
  return (
    <section className="footer__links">
      <div className="display-mobile">
        <div className="footer__links--container">
          {mobileLinks.map((section, index) => (
            <nav key={index}>
              <LinksList items={section.items} />
            </nav>
          ))}
        </div>
      </div>

      <div className="hidden-mobile">
        <div className="footer__links-columns">
          {links.map((section) => (
            <nav key={section.title}>
              <p className="text__title-mini footer__titles">{section.title}</p>
              <LinksList items={section.items} />
            </nav>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FooterLinks
