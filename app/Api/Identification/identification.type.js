module.exports = `

type Identifications {
  id: Int!
  user: User!
  name: String!
  value: String!
}


type Query {
  allIdentifications: [Identifications]
}


`;
