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
  user: User!
}

type Query {
  allAdress: [Adress]
}

`;
