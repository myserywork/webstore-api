"use strict";

const Identification = use("App/Models/Identification");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allIdentifications() {
      const identifications = await await Identification.all()
      return identifications.toJSON()
    },
    // Get a user by its ID
    async fetchIdentification(_,{ id }) {
      const identifications = await Identification.find(id)
      return identifications.toJSON()
    },

    async fetchUserIdentifications(_,{ userId }) {
      const identifications = await Identification.query().where('user_id','=',userId).fetch()
      return identifications.toJSON()
    },

  },

  Mutation: {

    // Create new Identification
    async createIdentification(_, { Input } , { auth } ) {

      const { user_id , name , value } = Input

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const rules = {
        user_id: 'required',
        name: 'required',
        value: 'required'
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 5 caracteres`
      }

      const validation = await validate({ user_id , name , value }  , rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }


      return await Identification.create({ user_id , name , value  })

    },

    async editIdentification(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const identification = await Identification
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( identification < 1 ) return null

      return Input

    },

    async deleteIdentification(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const identification = await Identification.find(id)

    if(!identification) {
      throw new GraphQLError('Identification nao encontrato')
    }

    const deleteIdentification = await identification.delete();

    return deleteIdentification

    }

  }



};


