import Image from 'next/image'

import Link from 'src/components/ui/Link'

export interface InfoCardProps {
  src: string
  alt: string
  width: string
  height: string
  href: string
  text?: string
  className?: string
}

const InfoCard = ({
  src,
  alt,
  text,
  width,
  height,
  href,
  className,
}: InfoCardProps) => {
  return (
    <Link href={href}>
      <div className={`infocard__container ${className ?? ''}`}>
        <Image
          src={src}
          alt={alt}
          className="infocard__img"
          loading="lazy"
          width={parseInt(width, 10)}
          height={parseInt(height, 10)}
        />
        {text && <span className="infocard__text">{text}</span>}
      </div>
    </Link>
  )
}

export default InfoCard
