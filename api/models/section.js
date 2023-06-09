/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
// M4_H1
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
      'SELECT * FROM area as a WHERE id_section = ? ORDER BY a.id_area ASC',
      [
        idSection
      ]
    )
    connection.release()
    return rows[0]
  }
}
