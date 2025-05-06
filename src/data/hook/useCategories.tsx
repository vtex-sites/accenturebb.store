import { useContext } from 'react'

import { CategoriesContex } from '../context/CategoriesContext'

const useCategories = () => useContext(CategoriesContex)

export default useCategories
