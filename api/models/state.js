module.exports = class State {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_state, name FROM state ORDER BY name'
    )
    connection.release()
    return rows[0]
  }

  static async fetchByUser (fastify, idUser) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT s.id_state, s.name, su.id_user
      FROM state as s
      LEFT OUTER JOIN stateuser as su
      ON s.id_state = su.id_state AND su.id_user = ? OR su.id_user IS NULL;`,
      [idUser]
    )
    connection.release()
    return rows[0]
  }
}
