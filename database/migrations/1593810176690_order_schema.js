'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id', 60).unsigned().references('id').inTable('users')
      table.string('payment_method', 60).notNullable()
      table.string('status').notNullable()
      table.string('deliveryTime', 60)
      table.integer('amount', 60).notNullable()
      table.integer('discount', 60).notNullable()
      table.integer('subtotal', 60).notNullable()
      table.integer('deliveryFee', 60).notNullable()
      table.integer('deliveryAddress', 60).unsigned().references('id').inTable('adresses')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
