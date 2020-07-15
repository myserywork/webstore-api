"use strict";

const OrderProduct = use("App/Models/OrderProduct");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allOrderProducts() {
      const OrderProducts = await await OrderProduct.all()
      return OrderProducts.toJSON()
    },
    // Get a user by its ID
    async fetchOrderProduct(_,{ id }) {
      const OrderProducts = await OrderProduct.find(id)
      return OrderProducts.toJSON()
    },

    async fetchUserOrderProducts(_,{ userId }) {
      const OrderProducts = await OrderProduct.query().where('user_id','=',userId).fetch()
      return OrderProducts.toJSON()
    },

  },

  Mutation: {

    // Create new OrderProduct
    async createOrderProduct(_, { Input } , { auth } ) {

      const { title , slug , type, unit  , description , price, salePrice, discountInPercent  } = Input

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

      const validation = await validate({ title , slug , type, unit  , description , price, salePrice, discountInPercent }  , rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }


      return await OrderProduct.create({ title , slug , type, unit ,  description , price, salePrice, discountInPercent })

    },

    async editOrderProduct(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const orderProduct = await OrderProduct
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( orderProduct < 1 ) return null

      return Input

    },

    async deleteOrderProduct(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const orderProduct = await OrderProduct.find(id)

    if(!orderProduct) {
      throw new GraphQLError('OrderProduct nao encontrato')
    }

    const deleteOrderProduct = await OrderProduct.delete();

    return deleteOrderProduct

    }

  }



};


