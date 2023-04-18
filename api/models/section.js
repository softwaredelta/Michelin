
module.exports = class Section {
  static async fetchQuestionsBySection (fastify, idCategory, idSection) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
        `SELECT q.id_question, q.p_text, q.camera, q.btn_na, q.picture, q.q_order, a.area_title, s.id_section
        FROM question AS q, categoryquestion AS cq, section AS s, area AS a
        WHERE q.id_question = cq.id_question AND q.id_area = a.id_area AND a.id_section = s.id_section AND s.id_section = ? AND cq.id_category = ?`,
        [
          idSection, idCategory
        ]
    )
    connection.release()
    return rows[0]
  }

  static async fetchAreas (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT * FROM area'
    )
    connection.release()
    return rows[0]
  }
}
