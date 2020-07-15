module.exports = `

type Gallery {
  id: Int!
  url: String
  product_id :  Int!
}


input GalleryInput {
  url: String
  product_id :  Int!
}


type Mutation {
  createGallery(Input: GalleryInput): Gallery
  editGallery(id: ID!,Input: GalleryInput): Gallery
  deleteGallery(id: ID!): String
}


type Query {
  allGalleries: [Gallery]
  fetchGallery(id: Int!): Gallery
}

`;
