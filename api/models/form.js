
module.exports = class Form {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT f.id_form, u.name AS user_name, u.last_name AS user_last_name, f.exterior_grade, f.interior_grade, f.client_grade, f.store_manager_grade, f.sp_name, f.file_link, f.duration, f.date, s.name AS zone
      FROM form as f, users as u, sellingpoint as sp, state as s
      WHERE f.id_user = u.id_user AND f.sp_name = sp.name AND sp.id_state = s.id_state`
    )
    connection.release()
    return rows[0]
  }

  static async fetchByUser (fastify, idUser) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT f.id_form, u.name AS user_name, u.last_name AS user_last_name, f.exterior_grade, f.interior_grade, f.client_grade, f.store_manager_grade, f.sp_name, f.file_link, f.duration, f.date, s.name AS zone
      FROM form as f, users as u, sellingpoint as sp, state as s
      WHERE f.id_user = u.id_user AND f.sp_name = sp.name AND sp.id_state = s.id_state AND f.id_user = ?`,
      [idUser]
    )
    connection.release()
    return rows[0]
  }

  static async createForm (fastify, idCategory, idUser, exteriorGrade, interiorGrade, clientGrade, storeManagerGrade, spName, fileName, duration, date) {
    /* console.log(idCategory)
    console.log(idUser)
    console.log(exteriorGrade)
    console.log(interiorGrade)
    console.log(clientGrade)
    console.log(storeManagerGrade)
    console.log(spName)
    console.log(fileName)
    console.log(duration)
    console.log(date) */
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
