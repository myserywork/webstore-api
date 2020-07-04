"use strict";

const Order = use("App/Models/Order");

// Define resolvers
const resolvers = {

  Query: {
    // Fetch all Stores
    async allOrders() {
      const order = await Order.all()
      return order.toJSON()
    }

  }


};

module.exports = resolvers;
