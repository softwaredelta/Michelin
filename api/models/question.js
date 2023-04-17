
module.exports = class Question {
    static async fetchAll (fastify) {
        const connection = await fastify.mysql.getConnection()
        const rows = await connection.query(
            `SELECT q.id_question, q.p_text, q.section, q.camera, q.btn_na, q.picture, q.q_order, cq.id_category 
            FROM question AS q, categoryquestion AS cq 
            WHERE q.id_question = cq.id_question`,
        )
        connection.release()
        return rows[0]
      }

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
