"use strict";

const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allUsers() {
      const users = await await User.query().with('identifications').fetch()
      return users.toJSON()
    },
    // Get a user by its ID
    async fetchUser(_,{ id }) {
      const user = await User.find(id)
      return user.toJSON()
    },

  },

  Mutation: {
    // Handles user login
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password)
      return token
    },

    // Create new user
    async createUser(_, { username, email, password }) {

      const rules = {
        email: 'required|email|unique:users',
        password: 'required|min:8',
        username: 'required',
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 8 caracteres`
      }

      const validation = await validate({ username, email, password }, rules, messages);

      if (validation.fails()) {
        throw new GraphQLError('Validation Failed', validation.messages())
      }

      return await User.create({ username, email, password })

    },

    async editUser(_, {id , Input}, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const user = await User
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( user < 1 ) return null

      return Input

    },

    async deleteUser(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const user = await User.find(id)

    if(!user) {
      throw new GraphQLError('usuario nao encontrado')
    }

    const deleteUser = await user.delete();

    return deleteUser

    }

  }



};


