const typeDefs = `
  type Installment {
    Value: Float!
    InterestRate: Float!
    TotalValuePlusInterestRate: Float!
    NumberOfInstallments: Float!
    PaymentSystemName: String!
    PaymentSystemGroupName: String!
    Name: String!
  }

  type DiscountHighlight {
    name: String!
  }

  type CommertialOffer {
    Installments: [Installment!]
    Price: Float
    ListPrice: Float
    discountHighlights: [DiscountHighlight!]
  }

  type Seller {
    sellerId: String
    sellerName: String
    addToCartLink: String
    sellerDefault: Boolean!
    commertialOffer: CommertialOffer
  }

  type Specification {
    originalName: String
    name: String
    values: [String]
  }

  type SpecificationGroup {
    originalName: String
    name: String
    specifications: [Specification]
  }

  extend type StoreProduct {
    Sellers: [Seller!]
    specificationGroups: [SpecificationGroup!]
  }
`

module.exports = typeDefs
