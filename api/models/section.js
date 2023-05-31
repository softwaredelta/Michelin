module.exports = class Section {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT * FROM section ORDER BY section.id_section'
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

  static async fetchAreasBySection (fastify, idSection) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT * FROM area as a WHERE id_section = ? ORDER BY a.id_area ASC', [idSection]
    )
    connection.release()
    return rows[0]
  }

  static async createSection(fastify, nameSection){
    const connection = await fastify.mysql.getConnection()
    console.log(nameSection)
    const rows0 = await connection.query(
      'SELECT MAX(id_section) FROM section;'
    )
    console.log(rows0[0].id_section)
    const rows = await connection.query(
      'INSERT INTO section(id_section,section_name) VALUES(?,?)',
      [
        rows0[0].id_section,
        nameSection
      ]
    )
    const rows1 = await connection.query(
      'SELECT MAX(id_section) FROM section;'
    )
    const rows2 = await connection.query(
      'INSERT INTO area(id_section, area_title) VALUES(?,?)',
      [
        rows1[0].id_section,
        nameSection
      ]
    )
    connection.release()
    return rows[0] +  rows1[0] + rows2[0]
  }
}
