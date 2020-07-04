'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GallerySchema extends Schema {
  up () {
    this.create('galleries', (table) => {
      table.increments()
      table.string('url').notNullable()
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.timestamps()
    })
  }

  down () {
    this.drop('galleries')
  }
}

module.exports = GallerySchema
