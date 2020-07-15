"use strict";

const Coupon = use("App/Models/Coupon");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allCoupons() {
      const coupons = await await Coupon.all()
      return coupons.toJSON()
    },
    // Get a user by its ID
    async fetchCoupon(_,{ id }) {
      const coupons = await Coupon.find(id)
      return coupons.toJSON()
    },

    async fetchUserCoupons(_,{ userId }) {
      const coupons = await Coupon.query().where('user_id','=',userId).fetch()
      return coupons.toJSON()
    },

  },

  Mutation: {

    // Create new Coupon
    async createCoupon(_, { Input } , { auth } ) {

      const { title, number_of_coupon, number_of_used_coupon, discount_in_percent, category, products, code , status , minimum_amount , expiration_date , description} = Input

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const rules = {
        title: 'required',
        number_of_coupon: 'required',
        number_of_used_coupon: 'required',
        discount_in_percent: 'required',
        category_id: 'required',
        code: 'required',
        status: 'required',
        minimum_amount: 'required',
        expiration_date: 'required',
        description: 'required'
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 5 caracteres`
      }

      const validation = await validate({ title, number_of_coupon, number_of_used_coupon, discount_in_percent, category_id, code , status , minimum_amount , expiration_date , description }, rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }

      const user_id = auth.user.id
      const category_id = 1

      return await Coupon.create({ title, number_of_coupon, number_of_used_coupon, discount_in_percent, category_id , code , status , minimum_amount , expiration_date , description })

    },

    async editCoupon(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const coupon = await Coupon
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( coupon < 1 ) return null

      return Input

    },

    async deleteCoupon(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const coupon = await Coupon.find(id)

    if(!coupon) {
      throw new GraphQLError('Coupon nao encontrato')
    }

    const deleteCoupon = await coupon.delete();

    return deleteCoupon

    }

  }



};


