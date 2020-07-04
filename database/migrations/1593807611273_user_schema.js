'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80)
      table.string('password').notNullable()
      table.string('first_name', 254)
      table.string('last_name', 254)
      table.string('email', 60).notNullable().unique()
      table.string('ip', 60)
      table.integer('status', 9).notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
