"use strict";

const Product = use("App/Models/Product");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allProducts() {
      const products = await await Product.all()
      return products.toJSON()
    },
    // Get a user by its ID
    async fetchProduct(_,{ id }) {
      const products = await Product.find(id)
      return products.toJSON()
    },

    async fetchUserProducts(_,{ userId }) {
      const products = await Product.query().where('user_id','=',userId).fetch()
      return products.toJSON()
    },

  },

  Mutation: {

    // Create new Product
    async createProduct(_, { Input } , { auth } ) {

      const { title , slug , type, unit  , description , price, salePrice, discountInPercent , author , meta } = Input

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const rules = {
        title: 'required',
        slug: 'required',
        type: 'required',
        unit: 'required',
        description: 'required',
        price: 'required',
        salePrice: 'required',
        discountInPercent: 'required',
        description: 'required',
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 5 caracteres`
      }

      const validation = await validate({ title , slug , type, unit  , description , price, salePrice, discountInPercent , author , meta }  , rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }


      return await Product.create({ title , slug , type, unit ,  description , price, salePrice, discountInPercent , author , meta})

    },

    async editProduct(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const product = await Product
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( product < 1 ) return null

      return Input

    },

    async deleteProduct(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const product = await Product.find(id)

    if(!product) {
      throw new GraphQLError('Product nao encontrato')
    }

    const deleteProduct = await product.delete();

    return deleteProduct

    }

  }



};


