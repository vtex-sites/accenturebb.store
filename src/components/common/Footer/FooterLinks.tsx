import { List as UIList } from '@faststore/ui'

import Link from 'src/components/ui/Link'

const links = [
  {
    title: 'SOBRE A LACOSTE',
    items: [
      {
        href: '/',
        name: 'O Grupo Lacoste',
      },
      {
        href: '/',
        name: 'Carreira',
      },
      {
        href: '/',
        name: 'Proteção da marca',
      },
    ],
  },
  {
    title: 'LOJA',
    items: [
      {
        href: '/',
        name: 'Coleção Homens',
      },
      {
        href: '/',
        name: 'Coleção Mulheres',
      },
      {
        href: '/',
        name: 'Coleção Infantil',
      },
      {
        href: '/',
        name: 'Loja de Polos',
      },
      {
        href: '/',
        name: 'Loja de Calçados',
      },
      {
        href: '/',
        name: 'Lacoste Live',
      },
      {
        href: '/',
        name: 'Lacoste Sport',
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
      <div className="footer__links-columns">
        {links.map((section) => (
          <nav key={section.title}>
            <p className="text__title-mini footer__titles">{section.title}</p>
            <LinksList items={section.items} />
          </nav>
        ))}
      </div>
    </section>
  )
}

export default FooterLinks
