/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

const PlacesApi = require('../util/places-api-util')

// M2_H4
module.exports = class SellingPoint {
  static async fetchAll (fastify) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT sp.id_sp, s.name AS zone, c.name AS category, sp.address, sp.name, sp.phone, sp.id_state, sp.id_category, sp.rating
      FROM sellingpoint AS sp, state AS s, category AS c 
      WHERE sp.id_state = s.id_state AND sp.id_category = c.id_category AND sp.sp_visible = 1`
    )
    connection.release()
    return rows[0]
  }

  static async fetchById (fastify, idSp) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      `SELECT sp.id_sp, s.name AS zone, c.name AS category, sp.address, sp.name, sp.phone, sp.id_state, sp.id_category, sp.rating
      FROM sellingpoint AS sp, state AS s, category AS c 
      WHERE sp.id_state = s.id_state AND sp.id_category = c.id_category AND sp.id_sp =? AND sp.sp_visible = 1`,
      [
        idSp
      ]
    )
    connection.release()
    return rows[0]
  }

  // M2_H1
  static async addSellingPoint (fastify, type, zone, address, name, phone) {
    const newRating = await PlacesApi.getRatingFromAPI({ address, name, rating: 0 })

    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'INSERT INTO sellingpoint(id_category, id_state, address, rating, name, phone, sp_visible) VALUES (?,?,?,?,?,?,1)',
      [
        type, zone, address, newRating, name, phone
      ]
    )
    connection.release()
  }

  // M2_H2
  static async deleteSP (fastify, idSp) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'UPDATE sellingpoint SET sp_visible = 0 WHERE id_sp = ?',
      [
        idSp
      ]
    )
  }

  // M2_H3
  static async editSellingPoint (fastify, type, zone, address, name, phone, idSp) {
    const connection = await fastify.mysql.getConnection()
    await connection.query(
      'UPDATE sellingpoint SET id_category = ?, id_state = ?, address = ?, name = ?, phone = ? WHERE id_sp = ?',
      [
        type, zone, address, name, phone, idSp
      ]
    )
    connection.release()
  }

  /**
   * This function updates the rating of selling points by querying their information from a database
   * and using the Google Places API to retrieve their ratings.
   */
  static async updateSellingPointRating (fastify) {
    const connection = await fastify.mysql.getConnection()
    const spData = await connection.query(
      'SELECT sp.id_sp, sp.address, sp.rating, sp.name FROM sellingpoint as sp'
    )

    await spData[0].forEach(async sp => {
      const newRating = await PlacesApi.getRatingFromAPI(sp)

      await connection.query(
        'UPDATE sellingpoint SET rating = ? WHERE id_sp = ?',
        [
          newRating, sp.id_sp
        ]
      )
    })
    connection.release()
  }
}
