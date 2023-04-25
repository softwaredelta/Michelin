
module.exports = class Form {
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
