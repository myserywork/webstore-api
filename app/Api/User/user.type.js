
module.exports = `

type User {
  id: Int!
  username: String!
  password: String
  first_name: String!
  last_name: String!
  email: String!
  Identifications: [Identifications],
  Orders: [Order],
  Adresses: [Adress]
  ip : String
  status : Int!
  group: [Group]
  Products : [Product]
}

type Identifications {
  id: Int!
  user_id: User!
  name: String!
  value: String!
}


type Query {
  allUsers: [User]
  fetchUser(id: Int!): User
}

input IdentificationsInput {
  id: Int!
  user: String!
  name: String!
  value: String!
}

input UserInput {
  username: String!
  password: String
  first_name: String!
  last_name: String!
  email: String!
  Identifications: [IdentificationsInput]
}

type Mutation {
  login (email: String!, password: String!): String
  createUser (username: String!, email: String!, password: String!): User
  editUser (id: ID!,Input: UserInput): User
}

`;


