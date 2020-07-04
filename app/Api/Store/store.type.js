module.exports = `

type StoreConfig {
  id: Int
  name: String
  url : String
  logo: String
  baseColor: String
  subColor: String
}

type Query {
  allConfigs: [StoreConfig]
}




`;
