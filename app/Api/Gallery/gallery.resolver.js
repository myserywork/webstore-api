"use strict";

const Gallery = use("App/Models/Gallery");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allGalleries() {
      const galleries = await await Gallery.all()
      return galleries.toJSON()
    },
    // Get a user by its ID
    async fetchGallery(_,{ id }) {
      const galleries = await Gallery.find(id)
      return galleries.toJSON()
    },

  },

  Mutation: {

    // Create new Gallery
    async createGallery(_, { Input } , { auth } ) {

      const { title, product_id } = Input

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const rules = {
        url: 'required',
        product_id: 'required',
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 5 caracteres`
      }

      const validation = await validate({ title, product_id  }, rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }


      return await Gallery.create({ title, product_id  })

    },

    async editGallery(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const gallery = await Gallery
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( gallery < 1 ) return null

      return Input

    },

    async deleteGallery(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const gallery = await Gallery.find(id)

    if(!gallery) {
      throw new GraphQLError('Gallery nao encontrato')
    }

    const deleteGallery = await gallery.delete();

    return deleteGallery

    }

  }



};


