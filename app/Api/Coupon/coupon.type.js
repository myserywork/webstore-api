module.exports = `



type Coupon {
  id: Int!
  title: String!
  number_of_coupon: Int!
  number_of_used_coupon: Int
  discount_in_percent: Int
  category_id: Int
  code: String
  minimum_amount: Int
  status: String
  expiration_date: String
  description: String
}


input CouponInput {
  id: Int
  title: String!
  number_of_coupon: Int!
  number_of_used_coupon: Int
  discount_in_percent: Int
  category_id: Int
  code: String
  minimum_amount: Int
  status: String
  expiration_date: String
  description: String
}


type Mutation {
  createCoupon (Input: CouponInput): Coupon
  editCoupon (id: ID!,Input: CouponInput): Coupon
  deleteCoupon (id: ID!): String
}


type Query {
  allCoupons: [Coupon]
  fetchCoupon(id: Int!): Coupon
  fetchUserCoupons(userId: Int!): [Coupon]
}



`;
