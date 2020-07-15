module.exports = `

type Category{
  id: Int
  title: String
  icon : String
  slug : String
  itemCount : Int
}


input CategoryInput {
  id: Int
  title: String
  icon : String
  slug : String
  itemCount : Int
}


type Mutation {
  createCategory(Input: CategoryInput): Coupon
  editCategory (id: ID!,Input: CategoryInput): Coupon
  deleteCategory (id: ID!): String
}


type Query {
  allCategories: [Coupon]
  fetchCategory(id: Int!): Coupon
}

`;
