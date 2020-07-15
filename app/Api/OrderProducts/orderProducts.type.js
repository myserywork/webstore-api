
module.exports = `

type OrderProduct {
  id: Int!
  title: String!
  slug: String!
  type: String!
  unit : Int
  description : String
  price : Int
  salePrice : Int
  discountInPercent : Int
}

input OrderProductInput {
  title: String!
  slug: String!
  type: String!
  unit : Int
  description : String
  price : Int
  salePrice : Int
  discountInPercent : Int
}


type Mutation {
  createOrderProduct(Input: OrderProductInput): OrderProduct
  editOrderProduct(id: ID!,Input: OrderProductInput): OrderProduct
  deleteOrderProduct(id: ID!): String
}


type Query {
  allOrderProducts: [OrderProduct]
  fetchUserOrderProducts(userId: Int!): [OrderProduct]
  fetchOrderProduct(id: Int!): OrderProduct
}



`;




