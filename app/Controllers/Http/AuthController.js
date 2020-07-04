'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class AuthController {
    async cadastro( { request }) {
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

    async login( { request, auth}) {
        const { email, password } = request.all();

        const token = await auth.attempt(email,password)

        return token;
    }


}

module.exports = AuthController
