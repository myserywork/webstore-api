"use strict";

const Adress = use("App/Models/Adress");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allAdresses() {
      const adresses = await await Adress.all()
      return adresses.toJSON()
    },
    // Get a user by its ID
    async fetchAdress(_,{ id }) {
      const adresses = await Adress.find(id)
      return adresses.toJSON()
    },

    async fetchUserAdresses(_,{ userId }) {
      const adresses = await Adress.query().where('user_id','=',userId).fetch()
      return adresses.toJSON()
    },

  },

  Mutation: {

    // Create new Adress
    async createAdress(_, { Input } , { auth } ) {

      const { referency, postCode, streetAdress, city, country, number, extra , description } = Input

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const rules = {
        referency: 'required',
        postCode: 'required|min:5',
        streetAdress: 'required',
        city: 'required',
        country: 'required',
        number: 'required',
        extra: 'required',
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 5 caracteres`
      }

      const validation = await validate({ referency, postCode, streetAdress, city, country, number, extra  }, rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }

      const user_id = auth.user.id

      return await Adress.create({ referency, postCode, streetAdress, city, country, number, extra , description , user_id  })

    },

    async editAdress(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const adress = await Adress
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( adress < 1 ) return null

      return Input

    },

    async deleteAdress(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const adress = await Adress.find(id)

    if(!adress) {
      throw new GraphQLError('Endereco nao encontrato')
    }

    const deleteAdress = await adress.delete();

    return deleteAdress

    }

  }



};


