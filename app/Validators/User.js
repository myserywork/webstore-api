'use strict'

class User {
  get rules () {
    return {
      email: 'required|email|unique:users',
      senha: 'required',
      primeiroNome: 'required',
      ultimoNome: 'required',
      cpf: 'required|unique:users',
      rg: 'required|unique:users',
      telefone: 'required'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'senha.required': 'You must provide a password'
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
      age: 'to_int'
    }
  }

  get validateAll () {
    return true
  }

}

module.exports = User
