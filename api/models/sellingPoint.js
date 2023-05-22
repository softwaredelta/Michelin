module.exports = class SellingPoint {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT sp.id_sp, s.name AS zone, c.name AS category, sp.address, sp.name, sp.phone, sp.id_state, sp.id_category
      FROM sellingpoint AS sp, state AS s, category AS c 
      WHERE sp.id_state = s.id_state AND sp.id_category = c.id_category`
    )
    connection.release()
    return rows[0]
  }

  static async fetchById (fastify, spId) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT sp.id_sp, s.name AS zone, c.name AS category, sp.address, sp.name, sp.phone, sp.id_state, sp.id_category
      FROM sellingpoint AS sp, state AS s, category AS c 
      WHERE sp.id_state = s.id_state AND sp.id_category = c.id_category AND sp.id_sp =?`,
      [spId]
    )
    connection.release()
    return rows[0]
  }

  static async addSellingPoint (fastify, type, zone, address, rating, name, phone) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'INSERT INTO sellingpoint(id_category, id_state, address, rating, name, phone) VALUES (?,?,?,?,?,?)',
      [
        type, zone, address, rating, name, phone
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
  }

  static async editSellingPoint (fastify, type, zone, address, name, phone, idSp) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'UPDATE sellingpoint SET id_category = ?, id_state = ?, address = ?, name = ?, phone = ? WHERE id_sp = ?',
      [
        type, zone, address, name, phone, idSp
      ]
    )
    connection.release()
  }
}
