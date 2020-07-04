'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('title', 60).notNullable()
      table.string('slug', 60).notNullable()
      table.string('type', 60).notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.integer('unit', 60).notNullable()
      table.string('image', 60).notNullable()
      table.string('description', 60).notNullable()
      table.integer('price', 60).notNullable()
      table.integer('salePrice', 60).notNullable()
      table.integer('discountInPercent', 60).notNullable()
      table.string('author', 60).notNullable()
      table.string('meta', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
