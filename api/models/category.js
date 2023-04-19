
module.exports = class Category {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_category, name FROM Category'
    )
    connection.release()
    return rows[0]
  }
}
