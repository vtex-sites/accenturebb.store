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

  type LogisticsItem {
    id: String
    requestIndex: Int
    quantity: Int
    seller: String
    sellerChain: [String]
    tax: Int
    priceValidUntil: String
    price: Int
    listPrice: Int
    rewardValue: Int
    sellingPrice: Int
    measurementUnit: String
    unitMultiplier: Int
    availability: String
  }

  type MessageFields {
    itemIndex: String
    ean: String
    skuName: String
  }

  type MessageInfo {
    code: String
    text: String
    status: String
    fields: MessageFields
  }

  type DeliveryIds {
    courierId: String
    warehouseId: String
    dockId: String
    courierName: String
    quantity: Int
  }

  type PickupAddress {
    addressType: String
    receiverName: String
    addressId: String
    postalCode: String
    city: String
    state: String
    country: String
    street: String
    number: String
    neighborhood: String
    complement: String
    reference: String
    geoCoordinates: [Float]
  }

  type pickupStoreInfo {
    friendlyName: String
    address: PickupAddress
    additionalInfo: String
    dockId: String
    isPickupStore: Boolean
  }

  type ShippingSLA {
    id: String
    name: String
    price: Float
    shippingEstimate: String
    shippingEstimateDate: String
    deliveryIds: [DeliveryIds]
    deliveryChannel: String
    friendlyName: String
    pickupPointId: String
    pickupStoreInfo: pickupStoreInfo
    pickupDistance: Float
  }

  type LogisticsInfo {
    itemIndex: String
    selectedSla: String
    slas: [ShippingSLA]
  }

  type NewsLetterData {
    id: String
  }

  type ShippingData {
    items: [LogisticsItem]
    logisticsInfo: [LogisticsInfo]
    messages: [MessageInfo]
  }

  type WishlistData {
    email: String
    productIds: String
    id: String
  }

  type WishlistDataMutation {
    message: String
  }

  input ShippingItem {
    id: String
    quantity: String
    seller: String
  }

  type WishListProductsData {
    productId: String
    productName: String
    link: String
    image: String
    price: String
    listPrice: String,
    brand: String,
    allInstallment: [Installment!]
    discountHighlights: [DiscountHighlight]
  }

  type Query {
    shipping(
      postalCode: String
      geoCoordinates: [String]
      country: String
      items: [ShippingItem]
    ): ShippingData

    newsLetter(email:String!):NewsLetterData
    getWishlist(email: String): WishlistData
    getWishListProducts(productIds: String): [WishListProductsData]
  }

  type Mutation {
    newsLetterUpdate(email:String!, id:String): NewsLetterData
    setWishlist(
      email: String
      productIds: String
      id: String
    ): WishlistDataMutation
  }
`

module.exports = typeDefs
