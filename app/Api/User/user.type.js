
module.exports = `

type User {
  id: Int!
  username: String!
  password: String
  name: String!
  email: String!
  Identifications: [Identifications],
  Orders: [Order],
  Adresses: [Adress]
  ip : String
  status : Int!
  group: [Group]
  Products : [Product]
},

type Query {
  allUsers: [User]
  fetchUser(id: Int!): User
}

type Mutation {
  login (email: String!, password: String!): String
  createUser (username: String!, email: String!, password: String!): User
}

`;

