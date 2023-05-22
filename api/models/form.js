
module.exports = class Form {
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
