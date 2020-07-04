"use strict";

const Gallery = use("App/Models/Gallery");

// Define resolvers
const resolvers = {

  Query: {
    // Fetch all Stores
    async allConfigs() {
      const gallery = await Gallery.all()
      return gallery.toJSON()
    }

  }


};

module.exports = resolvers;
