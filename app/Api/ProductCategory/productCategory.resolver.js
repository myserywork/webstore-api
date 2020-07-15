"use strict";

const ProductCategory = use("App/Models/ProductCategory");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allProductCategories() {
      const productCategories = await await ProductCategory.all()
      return productCategories.toJSON()
    },
    // Get a user by its ID
    async fetchProductCategory(_,{ id }) {
      const productCategories = await ProductCategory.find(id)
      return productCategories.toJSON()
    },

    async fetchUserProductCategories(_,{ userId }) {
      const productCategories = await ProductCategory.query().where('user_id','=',userId).fetch()
      return productCategories.toJSON()
    },

  },

  Mutation: {

    // Create new ProductCategory
    async createProductCategory(_, { Input } , { auth } ) {

      const { product_id, category_id, title } = Input

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const rules = {
        product_id: 'required',
        category_id: 'required',
        title: 'required',
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 5 caracteres`
      }

      const validation = await validate({ product_id, category_id, title }  , rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }


      return await ProductCategory.create({ product_id, category_id , title })

    },

    async editProductCategory(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const productcategory = await ProductCategory
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( productcategory < 1 ) return null

      return Input

    },

    async deleteProductCategory(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const productcategory = await ProductCategory.find(id)

    if(!productcategory) {
      throw new GraphQLError('ProductCategory nao encontrato')
    }

    const deleteProductCategory = await productcategory.delete();

    return deleteProductCategory

    }

  }



};


