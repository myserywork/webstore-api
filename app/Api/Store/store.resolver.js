"use strict";

const Store = use("App/Models/StoreConfig");

// Define resolvers
const resolvers = {

  Query: {
    // Fetch all Stores
    async allConfigs() {
      const store = await Store.all()
      return store.toJSON()
    }

  }


};

module.exports = resolvers;
