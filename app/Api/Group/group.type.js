module.exports = `

type Group{
  id: Int!
  name: String
  description: String
  level: Int
}


input GroupInput {
  name: String
  level :  Int!
  description: String
}



type Mutation {
  createGroup(Input: GroupInput): Group
  editGroup(id: ID!,Input: GroupInput): Group
  deleteGroup(id: ID!): String
}


type Query {
  allGroups: [Group]
  fetchGroup(id: Int!): Group
}



`;
