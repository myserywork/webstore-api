"use strict";

const Product = use("App/Models/Product");

// Define resolvers
const resolvers = {

  Query: {
    // Fetch all Stores
    async allConfigs() {
      const product = await Product.all()
      return product.toJSON()
    }

  }


};

module.exports = resolvers;
