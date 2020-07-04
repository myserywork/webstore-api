"use strict";

const Adress = use("App/Models/Adress");

// Define resolvers
const resolvers = {

  Query: {
    // Fetch all Stores
    async allAdress() {
      const adress = await Adress.all()
      return adress.toJSON()
    }

  }


};

module.exports = resolvers;
