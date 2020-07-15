'use strict'

class Adresses {
  get rules() {
    return {
      referency: 'required',
      postCode: 'required|min:5',
      streetAdress: 'required',
      city: 'required',
      country: 'required',
      number: 'required',
      extra: 'required',
    }
  }

  get messages() {
    return {
      'referency.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'postCode.min': '555 .',
      'postCode.required': 'You must provide a password'
    }
  }

  get sanitizationRules() {
    return {
      postCode: 'trim|normalize_email'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }
}

module.exports = Adresses
