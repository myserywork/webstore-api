"use strict";

const Category = use("App/Models/Category");

// Define resolvers
const resolvers = {

  Query: {
    // Fetch all Stores
    async allCategory() {
      const category = await Category.all()
      return category.toJSON()
    }

  }


};

module.exports = resolvers;
