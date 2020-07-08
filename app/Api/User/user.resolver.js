"use strict";

const User = use("App/Models/User");

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
      return await User.create({ username, email, password })
    },

    async editUser(_, {id , Input}, { auth }) {
      try {
        await auth.check()
        const user =  await User
        .query()
        .where('id', id)
        .update(Input)
        return Input
      } catch (error) {
        throw new Error('Missing or invalid jwt token')
      }
    }
  }


};


