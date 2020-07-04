'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Database = use('Database')
const OpcoesProduto = use('App/Models/OpcoesProduto')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with ordems
 */
class OpcoesProdutoController {

  async index ({ auth, request, response, view }) {
    return OpcoesProduto.all();
  }


  async store ({ request, response }) {
    const data = request.all([ 'idProduto', 'opcoes'])

    const rules = {

    }

    const messages = {
      required: (field) => `${field} é obrigatorio.`,
    }

    const validation = await validate(data, rules, messages);

    if (validation.fails()) {
      return validation.messages()
    }

    const opcoesProduto = await OpcoesProduto.create(data)

  return  response
  . status(200)
  .send(opcoesProduto);
  }


  async show ({ params, request, response, view }) {

    const idOpcao = request.params.id

    const opcoesProduto = await OpcoesProduto
    .query()
    .where('id', '=', idOpcao)
    .fetch()

    return  response
    .status(200)
    .send(opcoesProduto);
  }


  async update ({ auth, params, request, response }) {

    if(auth) {

      const idOpcao = request.params.id

      const data = request.all([ 'idProduto', 'opcoes' ])

       const update = await OpcoesProduto
        .query()
        .where('id', idOpcao)
        .update(data)

        const opcoesProduto = await OpcoesProduto.find(idOpcao);

        return response
            .status(200)
            .send(opcoesProduto)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })
  }


  async destroy ({ auth, params, request, response }) {

    if(auth) {
      const idOpcao = request.params.id

      const opcoesProduto = await OpcoesProduto.find(idOpcao)
      if(!opcoesProduto) return response
      .status(401)
      .send({ message: { error: 'Opcao produto nao cadastrada' } })

      const deletar = await opcoesProduto.delete();

      return response
        .status(200)
        .send(deletar)
    }

    return response
        .status(401)
        .send({ message: { error: 'Auth Failed' } })

  }

}

module.exports = OpcoesProdutoController
