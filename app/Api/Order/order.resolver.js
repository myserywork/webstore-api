"use strict";

const Order = use("App/Models/Order");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allOrders() {
      const orders = await await Order.all()
      return orders.toJSON()
    },
    // Get a user by its ID
    async fetchOrder(_,{ id }) {
      const orders = await Order.find(id)
      return orders.toJSON()
    },

    async fetchUserOrders(_,{ userId }) {
      const orders = await Order.query().where('user_id','=',userId).fetch()
      return orders.toJSON()
    },

  },

  Mutation: {

    // Create new Order
    async createOrder(_, { Input } , { auth } ) {

      const { user_id , payment_method , status, deliveryTime, amount , subtotal, discount , deliveryFee, deliveryAddress, description } = Input

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const rules = {
        user_id: 'required',
        payment_method: 'required',
        status: 'required',
        deliveryTime: 'required',
        amount: 'required',
        subtotal: 'required',
        discount: 'required',
        deliveryFee: 'required',
        deliveryAddress: 'required',
        description: 'required',
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 5 caracteres`
      }

      const validation = await validate({ user_id , payment_method , status, deliveryTime, amount , subtotal, discount , deliveryFee, deliveryAddress, description }  , rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }


      return await Order.create({ user_id , payment_method , status, deliveryTime, amount , subtotal, discount , deliveryFee, deliveryAddress, description  })

    },

    async editOrder(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const order = await Order
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( order < 1 ) return null

      return Input

    },

    async deleteOrder(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const order = await Order.find(id)

    if(!order) {
      throw new GraphQLError('Order nao encontrato')
    }

    const deleteOrder = await order.delete();

    return deleteOrder

    }

  }



};


