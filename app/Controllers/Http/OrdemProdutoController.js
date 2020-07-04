'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Database = use('Database')
const OrdemProduto = use('App/Models/OrdemProduto')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with ordems
 */
class OrdemProdutoController {

  async index ({ auth, request, response, view }) {
    return OrdemProduto.all();
  }


  async store ({ request, response }) {
    const data = request.all([ 'idOrdem', 'idUsuario', 'idProduto', 'nomeProduto', 'modeloProduto', 'quantidade' ,
    'valor','total','totalDesconto'])

    const rules = {
      idUsuario: 'required'
    }

    const messages = {
      required: (field) => `${field} é obrigatorio.`,
    }

    const validation = await validate(data, rules, messages);

    if (validation.fails()) {
      return validation.messages()
    }

    const ordemProduto = await OrdemProduto.create(data)

  return  response
  . status(200)
  .send(ordemProduto);
  }


  async show ({ params, request, response, view }) {

    const idOrdem = request.params.id

    const ordem = await OrdemProduto
    .query()
    .where('id', '=', idOrdem)
    .fetch()

    return  response
    .status(200)
    .send(ordem);
  }


  async update ({ auth, params, request, response }) {

    if(auth) {

      const idOrdem = request.params.id;

      const data = request.all([ 'idOrdem','idUsuario', 'idProduto', 'nomeProduto', 'modeloProduto', 'quantidade' ,
      'valor','total','totalDesconto'])

       const update = await OrdemProduto
        .query()
        .where('id', idOrdem)
        .update(data)

        const ordemProduto = await OrdemProduto.find(idOrdem);

        return response
            .status(200)
            .send(ordemProduto)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })
  }


  async destroy ({ auth, params, request, response }) {

    if(auth) {
      const idOrdem = request.params.id

      const ordem = await OrdemProduto.find(idOrdem)
      if(!ordem) return response
      .status(401)
      .send({ message: { error: 'Ordem nao cadastrada' } })

      const deletar = await ordem.delete();

      return response
        .status(200)
        .send(deletar)
    }

    return response
        .status(401)
        .send({ message: { error: 'Auth Failed' } })

  }

}

module.exports = OrdemProdutoController
