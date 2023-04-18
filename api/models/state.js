
module.exports = class State {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT id_state, name FROM State`
    )
    connection.release()
    return rows[0]
  }
}