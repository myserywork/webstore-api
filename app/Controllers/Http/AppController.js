'use strict'

const Database = use('Database')

class AppController {
 index () {
     return 'hey';
 }

 async list (request, response) {
    return await Database
      .table('users')
      .where('id',4)
      .paginate(1,2)
     }
}

module.exports = AppController
