module.exports = `


type Order {
  id: Int
  user : User!
  payment_method: String
  Products : [Product]
  status: String
  deliveryTime : String
  amount: Int
  subtotal : Int
  discount : Int
  deliveryFee : Int
  deliveryAddress : [Adress]
  description : String
  date : String
}



type Query {
  allOrders: [Order]
}

`;

/*
mutation {
  createUser(email: "ox5ggi@live.com",password: "test",username:"test") {
    username
  }
}

*/
