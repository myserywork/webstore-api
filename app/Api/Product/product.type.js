module.exports = `


type Product {
  id: Int!
  title: String!
  slug: String!
  type: String!
  Categories: [Category]
  unit : Int
  image : String!
  Gallery : [Gallery]
  description : String
  price : Int
  salePrice : Int
  discountInPercent : Int
  author : User!
  meta : String
}


`;
