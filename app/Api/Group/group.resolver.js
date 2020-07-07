"use strict";

const Group = use("App/Models/Group");

// Define resolvers
const resolvers = {

  Query: {
    // Fetch all Stores
    async allConfigs() {
      const group = await Group.all()
      return group.toJSON()
    }

  }


};

module.exports = resolvers;
