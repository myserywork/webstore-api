"use strict";

const Identification = use("App/Models/Identification");

// Define resolvers
const resolvers = {

  Query: {
    // Fetch all Stores
    async allIdentifications() {
      const identification = await Identification.all()
      return identification.toJSON()
    }

  }


};

module.exports = resolvers;
