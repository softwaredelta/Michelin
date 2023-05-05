
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

  static async createUser (fastify, name, lastName, idManager, email, password, idRole, idState) {
    const passwordEncrypted = await fastify.bcrypt.hash(password)
    const connection = await fastify.mysql.getConnection()
    const queryRes = await connection.query(
      'INSERT INTO users(name, last_name, id_manager, mail, password, id_role) VALUES (?,?,?,?,?, ?)',
      [
        name, lastName, idManager, email, passwordEncrypted, idRole
      ]
    )

    const userId = queryRes[0].insertId
    for (let i = 0; i < (idState.length); i++) {
      await connection.query(
        'INSERT INTO stateuser (id_user, id_state) VALUES (?,?)',
        [
          userId, idState[i]
        ]
      )
    }

    connection.release()
  }

  static async getRoles (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_role, name FROM role'
    )
    connection.release()
    return rows[0]
  }

  static async getManager (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_user, name, last_name FROM users WHERE id_role = 2'
    )
    connection.release()
    return rows[0]
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
