
module.exports = class User {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_user, name, last_name FROM Users'
    )
    connection.release()
    return rows[0]
  }

  static async verifyUser (fastify, email, password) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_user, name, password FROM Users WHERE mail =?', [email]
    )
    connection.release()
    const match = rows[0].length > 0 && await fastify.bcrypt.compare(password, rows[0][0].password)
    return match
  }

  static async createUser (fastify, name, lastName, idManager, email, password) {
    const passwordEncrypted = await fastify.bcrypt.hash(password)
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'INSERT INTO Users(name, last_name, id_manager, mail, password) VALUES (?,?,?,?,?)',
      [
        name, lastName, idManager, email, passwordEncrypted
      ]
    )
    connection.release()
  }
}
