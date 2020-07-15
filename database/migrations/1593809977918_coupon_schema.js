'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponSchema extends Schema {
  up () {
    this.create('coupons', (table) => {
      table.increments()
      table.string('title', 60).notNullable()
      table.integer('number_of_coupon', 60).notNullable()
      table.integer('number_of_used_coupon', 60).notNullable()
      table.integer('discount_in_percent').notNullable()
      table.integer('category_id', 60).unsigned().references('id').inTable('categories')
      table.string('code', 60).notNullable()
      table.integer('minimum_amount', 60).notNullable()
      table.string('status', 60).notNullable()
      table.string('expiration_date', 60).notNullable()
      table.string('description', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('coupons')
  }
}

module.exports = CouponSchema
