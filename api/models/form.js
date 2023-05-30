
module.exports = class Form {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT f.id_form, u.name AS user_name, u.last_name AS user_last_name, f.exterior_grade, f.interior_grade, f.client_grade, f.store_manager_grade, f.sp_name, f.file_link, f.duration, f.date, s.name AS zone
      FROM form as f, users as u, sellingpoint as sp, state as s
      WHERE f.id_user = u.id_user AND f.sp_name = sp.name AND sp.id_state = s.id_state
      ORDER BY f.date DESC`
    )
    connection.release()
    return rows[0]
  }

  static async fetchByUser (fastify, idUser) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT f.id_form, u.name AS user_name, u.last_name AS user_last_name, f.exterior_grade, f.interior_grade, f.client_grade, f.store_manager_grade, f.sp_name, f.file_link, f.duration, f.date, s.name AS zone
      FROM form as f, users as u, sellingpoint as sp, state as s
      WHERE f.id_user = u.id_user AND f.sp_name = sp.name AND sp.id_state = s.id_state AND f.id_user = ?
      ORDER BY f.date DESC`,
      [idUser]
    )
    connection.release()
    return rows[0]
  }

  static async fetchCount (fastify, idUser) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT COUNT(id_form) AS count FROM form'
    )
    connection.release()
    return rows[0]
  }

  static async fetchCountByUser (fastify, idUser) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT COUNT(id_form) AS count FROM form WHERE id_user = ?', [idUser]
    )
    connection.release()
    return rows[0]
  }

  static async createForm (fastify, idCategory, idUser, exteriorGrade, interiorGrade, clientGrade, storeManagerGrade, spName, fileName, duration, date) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      `INSERT INTO form(id_category, id_user, exterior_grade, interior_grade, client_grade, store_manager_grade, sp_name, file_link, duration, date) 
      VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        idCategory, idUser, exteriorGrade, interiorGrade, clientGrade, storeManagerGrade, spName, fileName, duration, date
      ]
    )
    connection.release()
  }
}
