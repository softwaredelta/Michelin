module.exports = class SellingPoint {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT sp.id_sp, s.name AS zone, sp.address, sp.name, sp.phone 
      FROM sellingpoint AS sp, state AS s 
      WHERE sp.id_state = s.id_state`
    )
    connection.release()
    return rows[0]
  }

  static async addSellingPoint (fastify, idType, idZone, address, rating, name, phone) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'INSERT INTO SellingPoint(id_category, id_state, address, rating, name, phone) VALUES (?,?,?,?,?,?)',
      [
        idType, idZone, address, rating, name, phone
      ]
    )
    connection.release()
  }

  static async deleteSP (fastify, idSp) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'DELETE FROM sellingpoint WHERE id_sp = ?',
      [idSp]
    )
    connection.release()
  }
}
