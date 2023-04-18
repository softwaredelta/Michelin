
module.exports = class Category {
  static async fetchQuestionsBySection (fastify, idCategory, section) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
        `SELECT q.id_question, q.p_text, q.section, q.camera, q.btn_na, q.picture, q.q_order 
        FROM question AS q, categoryquestion AS cq 
        WHERE q.id_question = cq.id_question AND q.section = ? AND cq.id_category = ?`,
        [
          section, idCategory
        ]
    )
    connection.release()
    return rows[0]
  }

  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT id_category, name FROM Category`
    )
    connection.release()
    return rows[0]
  }
}
