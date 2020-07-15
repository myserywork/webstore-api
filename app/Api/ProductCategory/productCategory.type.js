
module.exports = `

type ProductCategory {
  id: Int!
  product_id: Int!
  category_id: Int!
  title: String!
}

input ProductCategoryInput {
  product_id: Int!
  category_id: Int!
  title: String!
}


type Mutation {
  createProductCategory(Input: ProductCategoryInput): ProductCategory
  editProductCategory(id: ID!,Input: ProductCategoryInput): ProductCategory
  deleteProductCategory(id: ID!): String
}


type Query {
  allProductCategories: [ProductCategory]
  fetchUserProductCategories(userId: Int!): [ProductCategory]
  fetchProductCategory(id: Int!): ProductCategory
}



`;




