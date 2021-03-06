
module.exports = `

type Product {
  id: Int!
  title: String!
  slug: String!
  type: String!
  unit : Int
  image : String
  description : String
  price : Int
  salePrice : Int
  discountInPercent : Int
  author : Int
  meta : String
}

input ProductInput {
  title: String!
  slug: String!
  type: String!
  unit : Int
  image : String
  description : String
  price : Int
  salePrice : Int
  discountInPercent : Int
  author : Int
  meta : String
}


type Mutation {
  createProduct(Input: ProductInput): Product
  editProduct(id: ID!,Input: ProductInput): Product
  deleteProduct(id: ID!): String
}


type Query {
  allProducts: [Product]
  fetchUserProducts(userId: Int!): [Product]
  fetchProduct(id: Int!): Product
}



`;




