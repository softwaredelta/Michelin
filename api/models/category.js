
module.exports = class Category {
  static async addQuestion (fastify, questionText, section, usingCamera, btnNa, pictureName, questionOrder, idCategory) {
    const connection = await fastify.mysql.getConnection()
    const queryRes = await connection.query(
      'INSERT INTO Question(p_text, section, camara, btn_na, picture, q_order) VALUES (?,?,?,?,?,?)',
      [
        questionText, section, usingCamera, btnNa, pictureName, questionOrder
      ]
    )

    const questionId = queryRes[0].insertId

    await connection.query(
      'INSERT INTO CategoryQuestion(id_category, id_question) VALUES (?,?)',
      [
        idCategory, questionId
      ]
    )
    connection.release()
  }
}
