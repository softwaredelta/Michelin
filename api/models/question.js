
module.exports = class Question {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
            `SELECT q.id_question, q.p_text, q.section, q.camera, q.btn_na, q.picture, q.q_order, cq.id_category 
            FROM question AS q, categoryquestion AS cq 
            WHERE q.id_question = cq.id_question`
    )
    connection.release()
    return rows[0]
  }

  static async fetchHighestOrder (fastify, idArea) {
    const connection = await fastify.mysql.getConnection()
    const orderQueryRes = await connection.query(
      'SELECT MAX(q_order) FROM question WHERE id_area = ?',
      [
        idArea
      ]
    )
    connection.release()
    return orderQueryRes[0][0]['MAX(q_order)'] || 0
  }

  static async addQuestion (fastify, questionText, idArea, usingCamera, btnNa, pictureName, idCategory) {
    const connection = await fastify.mysql.getConnection()

    const questionOrder = await this.fetchHighestOrder(fastify, idArea) + 1

    const queryRes = await connection.query(
      'INSERT INTO Question(p_text, id_area, camera, btn_na, picture, q_order) VALUES (?,?,?,?,?,?)',
      [
        questionText, idArea, usingCamera, btnNa, pictureName, questionOrder
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
