'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCategorySchema extends Schema {
  up () {
    this.create('product_categories', (table) => {
      table.increments()
      table.string('title', 60).notNullable()
      table.string('slug', 60).notNullable()
      table.string('type', 60).notNullable()
      table.integer('order_id').unsigned().references('id').inTable('orders')
      table.integer('unit', 60).notNullable()
      table.string('image', 60)
      table.string('description', 60)
      table.integer('price', 60).notNullable()
      table.integer('salePrice', 60).notNullable()
      table.integer('discountInPercent', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('product_categories')
  }
}

module.exports = ProductCategorySchema

