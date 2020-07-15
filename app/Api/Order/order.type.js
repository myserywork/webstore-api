module.exports = `


type Order {
  id: Int
  user_id : Int
  payment_method: String
  status: String
  deliveryTime : String
  amount: Int
  subtotal : Int
  discount : Int
  deliveryFee : Int
  deliveryAddress : Int
  description : String
}

input OrderInput {
  user_id : Int!
  payment_method: String
  status: String
  deliveryTime : String
  amount: Int
  subtotal : Int
  discount : Int
  deliveryFee : Int
  deliveryAddress : Int
  description : String
}


type Mutation {
  createOrder(Input: OrderInput): Order
  editOrder(id: ID!,Input: OrderInput): Order
  deleteOrder(id: ID!): String
}


type Query {
  allOrders: [Order]
  fetchUserOrders(userId: Int!): [Order]
  fetchOrder(id: Int!): Order
}



`;




