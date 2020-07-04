"use strict"

const { makeExecutableSchema } = require("graphql-tools")


// Define our schema using the GraphQL schema language
const typeDefs = `
    type User {
      id: Int!
      username: String!
      password: String
      name: String!
      email: String!
      Identifications: [Identifications],
      Orders: [Order],
      Adresses: [Adress]
      ip : String
      status : Int!
      group: [Group]
      Products : [Product]
    }

    type Group{
      id: Int!
      name: String
      description: String
      user: User!
      level: Int
    }

    type UserGroup{
      id: Int!
      user: User!
      Group: Group!
    }

    type Adress {
      id: Int!
      referency: String!
      postCode: String!
      streetAdress: String!
      city: String!
      country: String!
      number: Int
      extra : String!
      user: User!
    }

    type Identifications {
      id: Int!
      user: User!
      name: String!
      value: String!
    }

    type Gallery {
      id: Int!
      url: String
      product : Product!
    }


    type Category{
      id: Int
      title: String
      icon : String
      slug : String
      itemCount : Int
    }

    type SubCategory{
      id: Int
      category_id: Int
      title: String
      type : String
      icon : String
      slug : String
      itemCount : Int
    }


    type Product {
      id: Int!
      title: String!
      slug: String!
      type: String!
      Categories: [Category]
      unit : Int
      image : String!
      Gallery : [Gallery]
      description : String
      price : Int
      salePrice : Int
      discountInPercent : Int
      author : User!
      meta : String
    }

    type Coupon {
      id: Int!
      title: String!
      number_of_coupon: Int!
      number_of_used_coupon: Int
      discount_in_percent: Int
      category: String
      products: [Product]
      code: String
      minimum_amount: Int
      status: String
      expiration_date: String
      description: String
    }


    type Order {
      id: Int
      user : User!
      payment_method: String
      Products : [Product]
      status: String
      deliveryTime : String
      amount: Int
      subtotal : Int
      discount : Int
      deliveryFee : Int
      deliveryAddress : [Adress]
      description : String
      date : String
    }

    type StoreConfig {
      id: Int
      name: String
      url : String
      logo: String
      baseColor: String
      subColor: String
    }


    type Query {
      allUsers: [User]
      fetchUser(id: Int!): User
      allProducts: [Product]
      fetchProduct(id: Int!): Product
    }


    type Mutation {
      login (email: String!, password: String!): String
      createUser (name: String!,username: String!, email: String!, password: String!): User
    }

  `;

module.exports = typeDefs;

