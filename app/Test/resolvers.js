"use strict";

const User = use("App/Models/User");
const Products = use("App/Models/Product");
const slugify = require("slugify");

// Define resolvers
const resolvers = {
  Query: {
    // Fetch all users
    async allUsers() {
      const users = await User.all();
      return users.toJSON();
    },
    // Get a user by its ID
    async fetchUser(_, { id }) {
      const user = await User.find(id);
      return user.toJSON();
    },
    // Fetch all Products
    async allProducts() {
      const Products = await Product.all();
      return Products.toJSON();
    },
    // Get a Product by its ID
    async fetchProduct(_, { id }) {
      const Product = await Product.find(id);
      return Product.toJSON();
    },
  },

  Mutation: {
    // Handles user login
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password);
      return token;
    },

    // Create new user
    async createUser(_, {  name, username, email, password }) {
      return await User.create({ name, username, email, password });
    },

  /*// Add a new Product
    async addProduct(_, { title, content }, { auth }) {
      try {
        // Check if user is logged in
        await auth.check();

        // Get the authenticated user
        const user = await auth.getUser();

        // Add new Product
        return await Product.create({
          user_id: user.id,
          title,
          slug: slugify(title, { lower: true }),
          content,
        });
      } catch (error) {
        // Throw error if user is not authenticated
        throw new Error("Missing or invalid jwt token");
      }
    }, */
  },


  User: {
    // Fetch all Products created by a user
    async Products(userInJson) {
      // Convert JSON to model instance
      const user = new User();
      user.newUp(userInJson);

      const Products = await user.Products().fetch();
      return Products.toJSON();
    },
  },
  Product: {
    // Fetch the author of a particular Product
    async user(ProductInJson) {
      // Convert JSON to model instance
      const Product = new Product();
      Product.newUp(ProductInJson);

      const user = await Product.user().fetch();
      return user.toJSON();
    },
  },
};

module.exports = resolvers;
