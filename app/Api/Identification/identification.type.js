module.exports = `

type Identification {
  id: Int!
  user_id: Int!
  name: String!
  value: String!
}


input IdentificationInput {
  user_id: Int!
  name: String!
  value: String!
}



type Mutation {
  createIdentification(Input: IdentificationInput): Identification
  editIdentification(id: ID!,Input: IdentificationInput): Identification
  deleteIdentification(id: ID!): String
}


type Query {
  allIdentifications: [Identification]
  fetchUserIdentifications(userId: Int!): [Identification]
  fetchIdentification(id: Int!): Identification
}

`;
