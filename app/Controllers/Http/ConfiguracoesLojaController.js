'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Database = use('Database')
const ConfiguracoesLoja = use('App/Models/ConfiguracoesLoja')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with ordems
 */
class ConfiguracoesLojaController {

  async index ({ auth, request, response, view }) {
    return ConfiguracoesLoja.all();
  }


  async store ({ request, response }) {
    const data = request.all([ 'grupo', 'chave' ,'valor', 'valorTexto'])

    const rules = {

    }

    const messages = {
      required: (field) => `${field} é obrigatorio.`,
    }

    const validation = await validate(data, rules, messages);

    if (validation.fails()) {
      return validation.messages()
    }

    const configuracoesLoja = await ConfiguracoesLoja.create(data)

  return  response
  . status(200)
  .send(configuracoesLoja);
  }


  async show ({ params, request, response, view }) {

    const idOpcao = request.params.id

    const configuracoesLoja = await ConfiguracoesLoja
    .query()
    .where('id', '=', idOpcao)
    .fetch()

    return  response
    .status(200)
    .send(configuracoesLoja);
  }


  async update ({ auth, params, request, response }) {

    if(auth) {

      const idOpcao = request.params.id

      const data = request.all([ 'grupo', 'chave' ,'valor', 'valorTexto'])

       const update = await ConfiguracoesLoja
        .query()
        .where('id', idOpcao)
        .update(data)

        const configuracoesLoja = await ConfiguracoesLoja.find(idOpcao);

        return response
            .status(200)
            .send(configuracoesLoja)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })
  }


  async destroy ({ auth, params, request, response }) {

    if(auth) {
      const idOpcao = request.params.id

      const configuracoesLoja = await ConfiguracoesLoja.find(idOpcao)
      if(!configuracoesLoja) return response
      .status(401)
      .send({ message: { error: 'Opcao produto nao cadastrada' } })

      const deletar = await configuracoesLoja.delete();

      return response
        .status(200)
        .send(deletar)
    }

    return response
        .status(401)
        .send({ message: { error: 'Auth Failed' } })

  }

}

module.exports = ConfiguracoesLojaController
