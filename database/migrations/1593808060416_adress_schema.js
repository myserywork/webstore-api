'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdressSchema extends Schema {
  up () {
    this.create('adresses', (table) => {
      table.increments()
      table.string('referency', 80).notNullable()
      table.string('postCode', 14).notNullable()
      table.string('streetAdress', 14).notNullable()
      table.string('city', 14).notNullable()
      table.string('country', 14).notNullable()
      table.string('number', 14).notNullable()
      table.string('extra', 14).notNullable()
      table.string('description', 254).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('adresses')
  }
}

module.exports = AdressSchema
