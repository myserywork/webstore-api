module.exports = `

type Category{
  id: Int
  title: String
  icon : String
  slug : String
  itemCount : Int
}

type Query {
  allCategory: [Category]
}

`;
