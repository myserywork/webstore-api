module.exports = `

type Adress {
  id: Int!
  referency: String!
  postCode: String!
  streetAdress: String!
  city: String!
  country: String!
  number: Int
  extra : String!
  description: String!
  user: User!
}

type Query {
  allAdress: [Adress]
}

input AdressInput {
  referency: String!
  postCode: String!
  streetAdress: String!
  city: String!
  country: String!
  number: Int
  description: String!
  extra : String!
}


type Mutation {
  createAdress (Input: AdressInput): Adress
  editAdress (id: ID!,Input: AdressInput): Adress
  deleteAdress (id: ID!): String
}


type Query {
  allAdresses: [Adress]
  fetchAdress(id: Int!): Adress
  fetchUserAdresses(userId: Int!): [Adress]
}



`;
