import type { Seller } from 'src/server'

interface SoldByProps {
  sellers: Seller[] | any
  isMobile: boolean
}

const SoldBy = ({ sellers, isMobile }: SoldByProps) => {
  const selectedSeller = sellers?.find(
    (seller: Seller) => seller?.sellerDefault === true
  )

  if (!selectedSeller) {
    return <></>
  }

  return (
    <>
      {!isMobile ? (
        <div data-fs-soldby-container>
          <span>
            Vendido por{' '}
            <span className="soldby-highlight">
              {selectedSeller.sellerName}
            </span>
          </span>
          <span>
            Entregue por{' '}
            <span className="soldby-highlight">
              {selectedSeller.sellerName}
            </span>
          </span>
        </div>
      ) : (
        <div data-fs-soldby-container>
          <span>
            Vendido por{' '}
            <span className="soldby-highlight">
              {selectedSeller.sellerName}
            </span>{' '}
            e entregue por{' '}
            <span className="soldby-highlight">
              {selectedSeller.sellerName}
            </span>
          </span>
        </div>
      )}
    </>
  )
}

export default SoldBy
