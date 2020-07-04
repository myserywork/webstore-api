'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IdentificationsSchema extends Schema {
  up () {
    this.create('identifications', (table) => {
      table.increments()
      table.string('name', 60).notNullable()
      table.string('value').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('identifications')
  }
}

module.exports = IdentificationsSchema
