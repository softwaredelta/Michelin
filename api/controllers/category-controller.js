const Category = require('../models/category')

exports.getCategories = (request, reply) => {
  const categoryData = Category.fetchAll(this.fastify)
  return categoryData
}
