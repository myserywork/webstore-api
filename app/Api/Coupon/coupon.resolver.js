"use strict";

const Coupon = use("App/Models/Coupon");

// Define resolvers
const resolvers = {

  Query: {
    // Fetch all Stores
    async allCoupons() {
      const coupon = await Coupon.all()
      return coupon.toJSON()
    }

  }


};

module.exports = resolvers;
