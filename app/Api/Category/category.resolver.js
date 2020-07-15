"use strict";

const Category = use("App/Models/Category");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allCategories() {
      const categories = await await Category.all()
      return categories.toJSON()
    },
    // Get a user by its ID
    async fetchCategory(_,{ id }) {
      const categories = await Category.find(id)
      return categories.toJSON()
    },

  },

  Mutation: {

    // Create new Category
    async createCategory(_, { Input } , { auth } ) {

      const { title, icon , slug , itemCount } = Input

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const rules = {
        title: 'required',
        icon: 'required',
        slug: 'required',
        itemCount: 'required'
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 5 caracteres`
      }

      const validation = await validate({ title, icon , slug , itemCount  }, rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }

      const user_id = auth.user.id
      const category_id = 1

      return await Category.create({ title, icon , slug , itemCount  })

    },

    async editCategory(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const category = await Category
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( category < 1 ) return null

      return Input

    },

    async deleteCategory(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const category = await Category.find(id)

    if(!category) {
      throw new GraphQLError('Category nao encontrato')
    }

    const deleteCategory = await category.delete();

    return deleteCategory

    }

  }



};


