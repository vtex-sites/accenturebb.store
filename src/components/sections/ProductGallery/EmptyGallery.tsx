import { Icon as UIIcon } from '@faststore/ui'

import { SearchNotFound } from 'src/images/search'
import EmptyState from 'src/components/ui/EmptyState'

function EmptyGallery() {
  return (
    <EmptyState variant="rounded">
      <header data-fs-empty-state-title>
        <p data-fs-empty-state-title-text>
          Poxa, não encontramos a palavra buscada.
        </p>
        <UIIcon component={<SearchNotFound />} />
      </header>
      <div>
        <p data-fs-empty-state-subtitle>Quem sabe tente o seguinte:</p>
      </div>
      <ul data-fs-empty-state-item>
        <li>- use palavras mais comuns</li>
        <li>- tente termos menos específicos</li>
        <li>- para facilitar, digite palavras de até 6 caracteres</li>
      </ul>
    </EmptyState>
  )
}

export default EmptyGallery
