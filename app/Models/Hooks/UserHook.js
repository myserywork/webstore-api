'use strict'

const Hash = use('Hash')
const UserHook = exports = module.exports = {}

var randomstring = require("randomstring");

UserHook.gerarCodigoEmail = async (user) => {
  user.emailVerification = await randomstring.generate(32)
}

