
module.exports = class User {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT u.id_user, u.name, u.last_name, u.id_manager, u.mail,
      m.name AS manager_name, m.last_name AS manager_last_name, 
      r.name AS role_name, 
      s.name as state_name,
      (SELECT COUNT(*) FROM form AS f WHERE u.id_user = f.id_user AND sp_name in (SELECT name FROM sellingpoint)) AS form_count
      FROM users AS u
      JOIN role AS r
      ON u.id_role = r.id_role
      LEFT OUTER JOIN users as m
      ON u.id_manager = m.id_user
      LEFT OUTER JOIN state as s
      ON s.id_state = (SELECT s.id_state FROM state as s, stateuser as su WHERE s.id_state = su.id_state AND su.id_user = u.id_user LIMIT 1)
      `
    )
    connection.release()
    return rows[0]
  }

  static async fetchUserByMail (fastify, mail) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_user, id_role FROM users WHERE mail = ?', [mail]
    )
    connection.release()
    return rows[0]
  }

  static async verifyUser (fastify, email, password) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_role, name, last_name, password FROM users WHERE mail =?', [email]
    )
    connection.release()
    const match = rows[0].length > 0 && await fastify.bcrypt.compare(password, rows[0][0].password)
    if (match) {
      return { status: true, id_role: rows[0][0].id_role, name: rows[0][0].name, last_name: rows[0][0].last_name }
    } else {
      return { status: false }
    }
  }

  static async createUser (fastify, name, lastName, idManager, email, password, idRole, idState) {
    const passwordEncrypted = await fastify.bcrypt.hash(password)
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_user FROM users WHERE mail = ?', [email]
    )
    const match = rows[0].length === 0
    if (match) {
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
    }

    connection.release()
    return match
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

  static async editUser (fastify, name, lastName, idUser, states) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'UPDATE users SET name = ?, last_name = ? WHERE id_user = ?',
      [
        name, lastName, idUser
      ]
    )

    await connection.query(
      'DELETE FROM stateuser WHERE id_user = ?',
      [idUser]
    )

    for (const idState in states.entities) {
      if (states.entities[idState].id_user === idUser) {
        await connection.query(
          'INSERT INTO stateuser (id_user, id_state) VALUES (?,?)',
          [
            idUser, idState
          ]
        )
      }
    }
    connection.release()
  }

  static async generateNewPassword (fastify, idUser, password) {
    const passwordEncrypted = await fastify.bcrypt.hash(password)
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'UPDATE users SET password = ? WHERE id_user = ?',
      [passwordEncrypted, idUser]
    )
    connection.release()
  }

  static async deleteUser (fastify, idUser) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'DELETE FROM stateuser WHERE id_user = ?',
      [idUser]
    )
    await connection.query(
      'UPDATE users SET id_manager = 0 WHERE id_manager = ?',
      [idUser]
    )
    await connection.query(
      'DELETE FROM users WHERE id_user = ?',
      [idUser]
    )
    connection.release()
  }
}
