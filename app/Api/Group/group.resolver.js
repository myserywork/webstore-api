"use strict";

const Group = use("App/Models/Group");
const User = use("App/Models/User");
const { validate } = use('Validator')
const GraphQLError = use('GraphQLError')

// Define resolvers
module.exports  = {

  Query: {
    async allGroups() {
      const groups = await await Group.all()
      return groups.toJSON()
    },
    // Get a user by its ID
    async fetchGroup(_,{ id }) {
      const groups = await Group.find(id)
      return groups.toJSON()
    },

  },

  Mutation: {

    // Create new Group
    async createGroup(_, { Input } , { auth } ) {

      const { name , level , description } = Input

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const rules = {
        name: 'required',
        level: 'required',
        description: 'required'
      }

      const messages = {
        required: (field) => `${field} é obrigatorio.`,
        unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
        min: (field) =>  `O campo ${field} deve conhter no minimo 5 caracteres`
      }

      const validation = await validate({ name , level , description} , rules, messages);

      if (validation.fails()) {
        console.log(validation.messages())
        throw new GraphQLError('Validation Failed', validation.messages())
      }


      return await Group.create({ name , level , description})

    },

    async editGroup(_, {id , Input }, { auth }) {

      try {
        await auth.check()
      } catch (error) {
        throw new Error(error)
      }

      const group = await Group
      .query()
      .where('id', id)
      .update(Input,Input)

      if ( group < 1 ) return null

      return Input

    },

    async deleteGroup(_, {id} , { auth }) {

    try {
      await auth.check()
    } catch (error) {
      throw new Error(error)
    }

    const group = await Group.find(id)

    if(!group) {
      throw new GraphQLError('Group nao encontrato')
    }

    const deleteGroup = await group.delete();

    return deleteGroup

    }

  }



};


