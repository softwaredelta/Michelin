
module.exports = class User {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT u.id_user, u.name, u.last_name, 
      m.name AS manager_name, m.last_name AS manager_last_name, 
      r.name AS role_name, 
      s.name AS state_name, 
      (SELECT COUNT(*) FROM form AS f WHERE u.id_user = f.id_user) AS form_count
      FROM users AS u, users as m, role as r, state as s, stateuser as su
      WHERE u.id_manager = m.id_user AND u.id_role = r.id_role AND u.id_user = su.id_user AND su.id_state = s.id_state`
    )
    connection.release()
    return rows[0]
  }

  static async verifyUser (fastify, email, password) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_user, name, password FROM users WHERE mail =?', [email]
    )
    connection.release()
    // const match = rows[0].length > 0 && await fastify.bcrypt.compare(password, rows[0][0].password)
    const match = rows[0].length > 0 && password === rows[0][0].password
    return match
  }

  static async createUser (fastify, name, lastName, idManager, email, password) {
    // const passwordEncrypted = await fastify.bcrypt.hash(password)
    const passwordEncrypted = password
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'INSERT INTO users(name, last_name, id_manager, mail, password) VALUES (?,?,?,?,?)',
      [
        name, lastName, idManager, email, passwordEncrypted
      ]
    )
    connection.release()
  }

  static async editUser (fastify, name, lastName, mail, idUser) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'UPDATE user SET name = ?, last_name = ?, mail = ? WHERE id_user = ?',
      [
        name, lastName, mail, idUser
      ]
    )
    connection.release()
  }

  static async deleteUser (fastify, idUser) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'DELETE FROM user WHERE id_user = ?',
      [idUser]
    )
  }
}
