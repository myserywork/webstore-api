'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Produto = use('App/Models/Produto')
const { validate } = use('Validator')


class ProdutoController {

  async index ({ request, response, view }) {
     return Produto.all();
  }



  async store ({ request, response }) {

    const data = request.only([ 'nome', 'descricao', 'tags', 'fabricante', 'codigoInterno', 'limitePorVenda', 'estoque' ])
        const rules = {
          nome: 'required',
          descricao: 'required',
          tags: 'required',
          fabricante: 'required',
          codigoInterno: 'required',
          limitePorVenda: 'required',
          estoque: 'required',
        }

        const messages = {
          required: (field) => `${field} é obrigatorio.`,
        }

        const validation = await validate(data, rules, messages);

        if (validation.fails()) {
          return validation.messages()
        }

        const produto = await Produto.create(data)

      return  response
    .status(200)
    .send(produto);

  }

  async show ({ params, request, response, view }) {

    const idProduto = request.params.id

    const produto = await Produto
    .query()
    .where('id', '=', idProduto)
    .fetch()

    return  response
    .status(200)
    .send(produto);
  }


  async edit ({ auth, params, request, response, view }) {

    if(auth) {

      const { id } = request.params;
      const idProduto = id

      const data = request.only([ 'nome', 'descricao', 'tags', 'fabricante', 'codigoInterno', 'limitePorVenda', 'estoque' ])

       const update = await Produto
        .query()
        .where('id', idProduto)
        .update(data)

        const produto = await Produto.find(idProduto);

        return response
            .status(200)
            .send(produto)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })

  }


  async update ({ auth, params, request, response }) {

    if(auth) {

      const { id } = request.params;
      const idProduto = id

      const data = request.only([ 'nome', 'descricao', 'tags', 'fabricante', 'codigoInterno', 'limitePorVenda', 'estoque' ])

       const update = await Produto
        .query()
        .where('id', idProduto)
        .update(data)

        const produto = await Produto.find(idProduto);

        return response
            .status(200)
            .send(produto)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })

  }


  async destroy ({ auth, params, request, response }) {
    if(auth) {

      const { id } = request.params;
      const idProduto = id

      const produtoAtual = await Produto.find(idProduto)
      if(!produtoAtual) return response
      .status(401)
      .send({ message: { error: 'Produto nao cadastrado' } })

      const deletar = await produtoAtual.delete();

      return response
        .status(200)
        .send(deletar)
    }

    return response
        .status(401)
        .send({ message: { error: 'Auth Failed' } })

  }
}

module.exports = ProdutoController
