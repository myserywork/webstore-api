'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Database = use('Database')
const OrdemStatus = use('App/Models/OrdemStatus')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with ordems
 */
class OrdemStatusController {

  async index ({ auth, request, response, view }) {
    return OrdemStatus.all();
  }


  async store ({ request, response }) {
    const data = request.all([ 'idOrdem', 'idUsuario', 'status', 'titulo', 'comentario', 'notificar'])

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

    const ordemStatus = await OrdemStatus.create(data)

  return  response
  . status(200)
  .send(ordemStatus);
  }


  async show ({ params, request, response, view }) {

    const idOrdem = request.params.id

    const ordemStatus = await OrdemStatus
    .query()
    .where('id', '=', idOrdem)
    .fetch()

    return  response
    .status(200)
    .send(ordemStatus);
  }


  async update ({ auth, params, request, response }) {

    if(auth) {

      const idOrdem = request.params.id;

      const data = request.all([ 'idOrdem', 'idUsuario', 'status', 'titulo', 'comentario', 'notificar'])

       const update = await OrdemStatus
        .query()
        .where('id', idOrdem)
        .update(data)

        const ordemStatus = await OrdemStatus.find(idOrdem);

        return response
            .status(200)
            .send(ordemStatus)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })
  }


  async destroy ({ auth, params, request, response }) {

    if(auth) {
      const idOrdem = request.params.id

      const ordem = await OrdemStatus.find(idOrdem)
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

module.exports = OrdemStatusController
