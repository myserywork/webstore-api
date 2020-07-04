'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const ImagensProduto = use('App/Models/ImagensProduto')
const { validate } = use('Validator')
var randomstring = require("randomstring");
const Helpers = use('Helpers')

class ImagensProdutoController {

  async index ({ request, response, view }) {
     return ImagensProduto.all();
  }


  async store ({ request, response }) {

    const data = request.only([ 'idProduto', 'linkImagem', 'ordem' ])
        const rules = {
          idProduto: 'required',
          linkImagem: 'required',
          ordem: 'required',
        }

        const messages = {
          required: (field) => `${field} é obrigatorio.`,
        }

        const validation = await validate(data, rules, messages);

        if (validation.fails()) {
          return validation.messages()
        }

        const imagensProduto = await ImagensProduto.create(data)

      return  response
    .status(200)
    .send(imagensProduto);

  }

  async show ({ params, request, response, view }) {

    const idProduto = request.params.id

    const imagensProduto = await ImagensProduto
    .query()
    .where('id', '=', idProduto)
    .fetch()

    return  response
    .status(200)
    .send(imagensProduto);
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
      const idProduto = request.params.id

      const data = request.only([ 'idProduto', 'linkImagem', 'ordem'])

       const update = await ImagensProduto
        .query()
        .where('id', idProduto)
        .update(data)

        const imagensProduto = await ImagensProduto.find(idProduto);

        return response
            .status(200)
            .send(imagensProduto)
      }

      return response
            .status(401)
            .send({ message: { error: 'Auth Failed' } })

  }


  async destroy ({ auth, params, request, response }) {
    if(auth) {


      const idProduto = request.params.id

      const imagensProduto = await ImagensProduto.find(idProduto)
      if(!imagensProduto) return response
      .status(401)
      .send({ message: { error: 'Imagens nao cadastrado' } })

      const deletar = await imagensProduto.delete();

      return response
        .status(200)
        .send(deletar)
    }

    return response
        .status(401)
        .send({ message: { error: 'Auth Failed' } })

  }


  async upload({ auth, params, request, response }){
    const idProduto = request.params.id
    const imagemProduto = request.file('imagemProduto', {
      types: ['image'],
      size: '4mb'
    })

    const nomeFinal = await idProduto +  randomstring.generate(22) + '.' + imagemProduto.extname

    await imagemProduto.move(Helpers.tmpPath('uploads'), {
      name: nomeFinal ,
      overwrite: true
    })

    if (!imagemProduto.moved()) {
      return imagemProduto.error()
    }

     const imageData = { idProduto: idProduto, linkImagem: 'uploads/' + nomeFinal }
     const imagem = ImagensProduto.create(imageData)

    return response.status(200).send(imageData)
  }

}

module.exports = ImagensProdutoController


