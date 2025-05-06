import Link from 'src/components/ui/Link'

export interface HeaderLinkProps {
  name: string
  link: string
}

function HeaderLink({ name, link }: HeaderLinkProps) {
  if (link) {
    return (
      <li className="link">
        <Link data-fs-navlinks-link variant="display" href={link}>
          {name}
        </Link>
      </li>
    )
  }

  return (
    <li className="link">
      <Link data-fs-navlinks-link variant="display" href="/#">
        {name}
      </Link>
    </li>
  )
}

export default HeaderLink
