/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

module.exports = class Question {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
            `SELECT q.id_question, q.p_text, q.id_area, q.camera, q.btn_na, q.picture, q.q_order, cq.id_category 
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

  // M4_H3
  static async addQuestion (fastify, questionText, idArea, usingCamera, btnNa, pictureName, idCategory) {
    const connection = await fastify.mysql.getConnection()

    const questionOrder = await this.fetchHighestOrder(fastify, idArea) + 1

    const queryRes = await connection.query(
      'INSERT INTO question(p_text, id_area, camera, btn_na, picture, q_order) VALUES (?,?,?,?,?,?)',
      [
        questionText, idArea, usingCamera, btnNa, pictureName, questionOrder
      ]
    )

    const questionId = queryRes[0].insertId

    await connection.query(
      'INSERT INTO categoryquestion(id_category, id_question) VALUES (?,?)',
      [
        idCategory, questionId
      ]
    )
    connection.release()
  }

  // M4_H1
  static async fetchQuestionsBySection (fastify, idCategory, idSection) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
        `SELECT q.id_question, q.p_text, q.id_area, q.camera, q.btn_na, q.picture, q.q_order, a.area_title
        FROM question AS q, categoryquestion AS cq, section AS s, area AS a
        WHERE q.id_question = cq.id_question AND q.id_area = a.id_area AND a.id_section = s.id_section AND s.id_section = ? AND cq.id_category = ?
        ORDER BY a.id_area ASC, q.q_order ASC`,
        [
          idSection, idCategory
        ]
    )
    connection.release()
    return rows[0]
  }

  // M4_H4
  static async deleteQuestion (fastify, idCategory, idQuestion, order) {
    const connection = await fastify.mysql.getConnection()
    const updateOrder = await connection.query(
      `UPDATE question SET q_order = q_order - 1 
       WHERE q_order > ? AND id_area = (SELECT areaid FROM (SELECT id_area as areaid FROM question WHERE id_question = ?) AS qa)`,
      [
        order, idQuestion
      ]
    )
    const rows = await connection.query(
      'DELETE FROM categoryquestion WHERE id_question = ? AND id_category = ?',
      [
        idQuestion, idCategory
      ]
    )
    const rows1 = await connection.query(
      'DELETE FROM question WHERE id_question = ?',
      [
        idQuestion
      ]
    )
    connection.release()

    return updateOrder[0] + rows[0] + rows1[0]
  }

  // M4_H2
  static async editQuestion (fastify, idQuestion, questionText, usingCamera, btnNa) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'UPDATE question SET p_text = ?, camera = ?, btn_na = ? WHERE id_question = ?',
      [
        questionText, usingCamera, btnNa, idQuestion
      ]
    )
    connection.release()
  }
}
