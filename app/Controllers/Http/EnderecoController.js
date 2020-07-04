'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */



const Database = use('Database')
const Endereco = use('App/Models/Endereco')
const { validate } = use('Validator')


class EnderecoController {

  async index ({ auth, request, response, view }) {
    const enderecos = await Endereco
    .query()
    .where('idUsuario', '=', auth.user.id)
    .fetch()

    return  response
    .status(200)
    .send(enderecos);
  }


  async store ({ auth, request, response}) {

    const data = request.only([ 'referencia', 'cep' , 'cidade', 'lougradouro', 'primeiroNome', 'ultimoNome', 'cpf', 'rg', 'uf' ,'complemento'])
        const rules = {
          referencia: 'required',
          cep: 'required',
          cidade: 'required',
          lougradouro: 'required',
          complemento: 'required',
          primeiroNome: 'required',
          ultimoNome: 'required',
          cpf: 'required',
          rg: 'required',
          uf: 'required'
        }

        const messages = {
          required: (field) => `${field} é obrigatorio.`,
        }

        const validation = await validate(data, rules, messages);

        if (validation.fails()) {
          return validation.messages()
        }

        data.idUsuario = auth.user.id
        data.principal = 1;

        const endereco = await Endereco.create(data)

      return  response
    .status(200)
    .send(endereco);
  }


  async show ({ params, request, response, view }) {

    const idEndereco = request.params.id

    const endereco = await Endereco
    .query()
    .where('id', '=', idEndereco)
    .fetch()

    return  response
    .status(200)
    .send(endereco);
  }

  async edit ({ auth, params, request, response, view }) {
    if(auth) {

      const { id } = request.params;
      const idEndereco = id
      const enderecoAtual = await Endereco.find(idEndereco)

      if(enderecoAtual.idUsuario != auth.user.id ) {
        return response
        .status(401)
        .send({ message: { error: 'Usuario sem permissao para vizualisar enderecos de outros usuarios' } })
      }

      const  data  = request.only([ 'referencia', 'cep' , 'cidade', 'lougradouro', 'primeiroNome', 'ultimoNome', 'cpf', 'rg', 'uf' ,'complemento'])

       const update = await Endereco
        .query()
        .where('id', idEndereco)
        .update(data)

        const endereco = await Endereco.find(idEndereco);

        return response
            .status(200)
            .send(endereco)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })
  }


  async update ({ auth, params, request, response }) {
    if(auth) {

      const { id } = request.params;
      const idEndereco = id
      const enderecoAtual = await Endereco.find(idEndereco)

      if(enderecoAtual.idUsuario != auth.user.id ) {
        return response
        .status(401)
        .send({ message: { error: 'Usuario sem permissao para vizualisar enderecos de outros usuarios' } })
      }

      const  data  = request.only([ 'referencia', 'cep' , 'cidade', 'lougradouro', 'primeiroNome', 'ultimoNome', 'cpf', 'rg', 'uf' ,'complemento'])

       const update = await Endereco
        .query()
        .where('id', idEndereco)
        .update(data)

        const endereco = await Endereco.find(idEndereco);

        return response
            .status(200)
            .send(endereco)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })
  }


  async destroy ({ auth, params, request, response }) {
    if(auth) {

      const { id } = request.params;
      const idEndereco = id

      const enderecoAtual = await Endereco.find(idEndereco)
      if(!enderecoAtual) return response
      .status(401)
      .send({ message: { error: 'Endereco nao cadastrado' } })

      if(enderecoAtual.idUsuario != auth.user.id ) {
        return response
        .status(401)
        .send({ message: { error: 'Usuario sem permissao para deletar enderecos de outros usuarios' } })
      }

      const deletar = await enderecoAtual.delete();

      return response
        .status(200)
        .send(deletar)
    }

    return response
        .status(401)
        .send({ message: { error: 'Auth Failed' } })
  }
}

module.exports = EnderecoController
