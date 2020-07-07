"use strict";

const User = use("App/Models/User");

// Define resolvers
module.exports  = {

  Query: {
    async allUsers() {
      const users = await User.all()
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

    async editUser(_, {request, Input}, { auth }) {

     console.log(request)
      try {
        await auth.check()

      } catch (error) {
        // return error.message
      }

       console.log(Input)
       const dota = {}
       dota.id = 0;
       return  dota
       return await User.create({ username, email, password })
    }

  }


};


