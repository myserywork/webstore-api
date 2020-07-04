'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoreConfigSchema extends Schema {
  up () {
    this.create('store_configs', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('url').notNullable()
      table.string('logo').notNullable()
      table.string('baseColor').notNullable()
      table.string('subColor').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('store_configs')
  }
}

module.exports = StoreConfigSchema
