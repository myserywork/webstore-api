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
      console.log("checK")
      return await User.create({ username, email, password })
    },
  }


};


