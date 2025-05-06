import type { StoreCollectionType } from '@generated/graphql'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface NodeProps {
  node: {
    type: StoreCollectionType
    breadcrumbList: {
      itemListElement: Array<{
        name: string
        item: string
        position: number
      }>
    }
  }
}

interface GetSubCategoriesProps {
  edges: NodeProps[]
  categories: NodeProps[]
}

interface GetCategoriesProps {
  edges: NodeProps[]
}

const GetSubCategories = ({ edges, categories }: GetSubCategoriesProps) => {
  const sub = categories.reduce((catAcc: any, cat) => {
    const subCat = edges
      .filter(
        (el) =>
          el.node.type === 'Category' &&
          el.node.breadcrumbList.itemListElement[1].item ===
            cat.node.breadcrumbList.itemListElement[1].item &&
          el.node.breadcrumbList.itemListElement.length === 3
      )
      .flat()

    const categ = cat.node.breadcrumbList.itemListElement[1]
    const subCategory = subCat.map(
      (el) => el.node.breadcrumbList.itemListElement[2]
    )

    const currentCateg = { category: categ, subCategory: [...subCategory] }

    return [...catAcc, currentCateg]
  }, [])

  return sub
}

const GetAllCategory = ({ edges }: GetCategoriesProps) => {
  const departNode = edges.filter((el) => el.node.type === 'Department').flat()
  const allDepart = departNode.reduce((departAcc: any, departament) => {
    const categories = edges
      .filter(
        (el) =>
          el.node.type === 'Category' &&
          el.node.breadcrumbList.itemListElement[0].name ===
            departament.node.breadcrumbList.itemListElement[0].name &&
          el.node.breadcrumbList.itemListElement.length === 2
      )
      .flat()

    const sub = GetSubCategories({ edges, categories })
    const dep = departament.node.breadcrumbList.itemListElement[0]
    const menuCat = { department: dep, categories: sub }

    return [...departAcc, menuCat]
  }, [])

  return allDepart
}

export default GetAllCategory
