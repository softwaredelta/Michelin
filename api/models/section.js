
module.exports = class Section {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT * FROM section ORDER BY section.id_section'
    )
    connection.release()
    return rows[0]
  }

  static async fetchAreas (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT * FROM area'
    )
    connection.release()
    return rows[0]
  }

  static async fetchAreasBySection (fastify, idSection) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT * FROM area where id_section = ?', [idSection]
    )
    connection.release()
    return rows[0]
  }
}
