'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Database = use('Database')
const Ordem = use('App/Models/Ordem')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with ordems
 */
class OrdemController {

  async index ({ auth, request, response, view }) {
    return Ordem.all();
  }


  async store ({ request, response }) {
    const data = request.all([ 'idUsuario', 'email', 'primeiroNome', 'ultimoNome', 'cpf' ,
    'telefone','rg','ip','cep','cidade','lougradouro','complemento','uf','metodoPagamento',
    'metodoEnvio','custoEnvio','total','totalDesconto','cupomDesconto' ])

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

    const ordem = await Ordem.create(data)

  return  response
  . status(200)
  .send(ordem);
  }


  async show ({ params, request, response, view }) {

    const idOrdem = request.params.id

    const ordem = await Ordem
    .query()
    .where('id', '=', idOrdem)
    .fetch()

    return  response
    .status(200)
    .send(ordem);
  }



  async edit ({ auth, params, request, response, view }) {

    if(auth) {

      const idOrdem = request.params.id;

      const data = request.all([ 'idUsuario', 'email', 'primeiroNome', 'ultimoNome', 'cpf' ,
      'telefone','rg','ip','cep','cidade','lougradouro','complemento','uf','metodoPagamento',
      'metodoEnvio','custoEnvio','total','totalDesconto','cupomDesconto' ])

       const update = await Ordem
        .query()
        .where('id', idOrdem)
        .update(data)

        const ordem = await Ordem.find(idOrdem);

        return response
            .status(200)
            .send(ordem)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })

  }


  async update ({ auth, params, request, response }) {

    if(auth) {

      const idOrdem = request.params.id;

      const data = request.all([ 'idUsuario', 'email', 'primeiroNome', 'ultimoNome', 'cpf' ,
      'telefone','rg','ip','cep','cidade','lougradouro','complemento','uf','metodoPagamento',
      'metodoEnvio','custoEnvio','total','totalDesconto','cupomDesconto' ])

       const update = await Ordem
        .query()
        .where('id', idOrdem)
        .update(data)

        const ordem = await Ordem.find(idOrdem);

        return response
            .status(200)
            .send(ordem)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })
  }


  async destroy ({ auth, params, request, response }) {

    if(auth) {
      const idOrdem = request.params.id

      const ordem = await Ordem.find(idOrdem)
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

module.exports = OrdemController
