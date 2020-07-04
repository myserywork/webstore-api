'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubCategorySchema extends Schema {
  up () {
    this.create('sub_categories', (table) => {
      table.increments()
      table.string('title', 60).notNullable()
      table.string('type', 60).notNullable()
      table.string('icon', 60).notNullable()
      table.string('slug', 60).notNullable()
      table.string('itemCount', 60).notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('sub_categories')
  }
}

module.exports = SubCategorySchema
