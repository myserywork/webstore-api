'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Database = use('Database')
const User = use('App/Models/User')
const { validate } = use('Validator')

class UsuarioController {


  async index ({ auth, params, response}) {

    if (!auth.user.admin) return response.status(401).send({ message: { error: 'Voce precisa ser um administrador' } })

    const usuarios =   await User.find(auth.user.id)

      if (usuarios) return response.status(200).send(usuarios)

      return response.status(401).send({ message: { error: 'Erro com sua requisicao' } })

   }


  async store ({ request, response }) {

    const data = request.only([ 'email', 'password' , 'primeiroNome', 'ultimoNome', 'cpf', 'rg', 'telefone'])
    const rules = {
      email: 'required|email|unique:users',
      password: 'required|min:8',
      primeiroNome: 'required',
      ultimoNome: 'required',
      cpf: 'required|unique:users',
      rg: 'required|unique:users',
      telefone: 'required'
    }

    const messages = {
      required: (field) => `${field} é obrigatorio.`,
      unique: (field) => `o campo ${field} já se encontra nos nossos registros'`,
      'password.min' : 'O campo password deve conhter no minimo 8 caracteres'
    }

    const validation = await validate(data, rules, messages);

    if (validation.fails()) {
      return validation.messages()
    }

    const user = await User.create(data)

    return user;
  }


  async show ({ auth , params, request, response, view }) {
    const idUsuario = request.params.id;

    const usuario = await User
    .query()
    .where('id', '=', idUsuario)
    .fetch()

    return  response
    .status(200)
    .send(usuario);

  }


  async edit ({ auth, params, request, response, view }) {

    if(auth) {

      const  data  = request.only([ 'email', 'primeiroNome', 'ultimoNome', 'cpf', 'rg', 'telefone'])

       const update = await User
        .query()
        .where('id', auth.user.id)
        .update(data)

        const user = await User.find(auth.user.id);

        return response
            .status(200)
            .send(user)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })

  }


  async update ({ auth, params, request, response }) {

    if(auth) {

      const  data  = request.only([ 'email', 'primeiroNome', 'ultimoNome', 'cpf', 'rg', 'telefone'])

       const update = await User
        .query()
        .where('id', auth.user.id)
        .update(data)

        const user = await User.find(auth.user.id);

        return response
            .status(200)
            .send(user)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })

  }

  async destroy ({ auth, params, request, response }) {

    if(auth) {

      const idUsuario = request.params.id

      const user = await User.find(idUsuario)
      if(!user) return response
      .status(401)
      .send({ message: { error: 'Usuario nao cadastrado' } })


      const deletar = await User.delete();

      return response
        .status(200)
        .send(deletar)
    }

    return response
        .status(401)
        .send({ message: { error: 'Auth Failed' } })
  }

}

module.exports = UsuarioController
