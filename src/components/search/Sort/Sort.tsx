import { useSearch } from '@faststore/sdk'

import Select from 'src/components/ui/Select'

const OptionsMap = {
  price_desc: 'Maior preço',
  price_asc: 'Menor preço',
  orders_desc: 'Mais vendidos',
  name_asc: 'A-Z',
  name_desc: 'Z-A',
  release_desc: 'Data de lançamento',
  discount_desc: 'Desconto',
  score_desc: 'Relevância',
}

const keys = Object.keys(OptionsMap) as Array<keyof typeof OptionsMap>

function Sort() {
  const { state, setState } = useSearch()

  return (
    <Select
      id="sort-select"
      className="sort / text__title-mini-alt"
      label="Ordernar por:"
      options={OptionsMap}
      onChange={(e) => {
        const sort = keys[e.target.selectedIndex]

        setState({
          ...state,
          sort,
          page: 0,
        })
      }}
      value={state.sort}
      testId="search-sort"
    />
  )
}

export default Sort
