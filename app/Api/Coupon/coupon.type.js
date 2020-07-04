module.exports = `

type Coupon {
  id: Int!
  title: String!
  number_of_coupon: Int!
  number_of_used_coupon: Int
  discount_in_percent: Int
  category: String
  products: [Product]
  code: String
  minimum_amount: Int
  status: String
  expiration_date: String
  description: String
}

type Query {
  allCoupons: [Coupon]
}

`;
