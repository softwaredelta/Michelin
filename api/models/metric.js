/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M5_H1

module.exports = class Metric {
  static async averageTime (fastify, dFilter, zone, user) {
    const connection = await fastify.mysql.getConnection()
    const filters = 'SELECT AVG(f.duration) AS "TIEMPO" FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -5 MONTH) AND f.sp_name = sp.name ' + dFilter + zone + user
    const rows = await connection.query(
      filters
    )
    connection.release()
    return rows[0]
  }

  static async averageGradeByMonth (fastify, dFilter, zone, user) {
    const connection = await fastify.mysql.getConnection()
    const queryString = "SELECT YEAR(f.date), MONTH(f.date) AS 'MONTH', AVG(f.exterior_grade) AS 'EXTERIOR', AVG(f.interior_grade) AS 'INTERIOR', AVG(f.client_grade) AS 'CLIENT', AVG(f.store_manager_grade) AS 'MANAGER' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -5 MONTH) AND f.sp_name = sp.name " + dFilter + zone + user + ' GROUP BY YEAR(f.date), MONTH(f.date) ORDER BY YEAR(f.date) ASC'
    const rows = await connection.query(
      queryString
    )
    connection.release()
    return rows[0]
  }

  static async averageGradeCur (fastify, dFilter, zone, user) {
    const connection = await fastify.mysql.getConnection()
    const queryString = "SELECT AVG(f.exterior_grade) AS 'EXTERIOR', AVG(f.interior_grade) AS 'INTERIOR', AVG(f.client_grade) AS 'CLIENT', AVG(f.store_manager_grade) AS 'MANAGER' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -5 MONTH) AND f.sp_name = sp.name " + dFilter + zone + user
    const rows = await connection.query(
      queryString
    )
    connection.release()
    return rows[0]
  }

  static async averageGradePDV (fastify, dFilter, zone, user) {
    const connection = await fastify.mysql.getConnection()
    const queryString = "SELECT (sb.EXT+sb.INTE+sb.CLIENT+sb.MANAGER)/(4*1.0) as 'PROMEDIO' FROM (SELECT AVG(f.exterior_grade) AS EXT, AVG(f.interior_grade) AS INTE, AVG(f.client_grade) AS CLIENT, AVG(f.store_manager_grade) AS MANAGER FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -5 MONTH) AND f.sp_name = sp.name " + dFilter + zone + user + ') AS sb'
    const rows = await connection.query(
      queryString
    )
    connection.release()
    return rows[0]
  }

  static async formsCurrentMonth (fastify, dFilter, zone, user) {
    const connection = await fastify.mysql.getConnection()
    const queryString = "SELECT COUNT(f.id_form) AS 'FORMSCUR' FROM form f, sellingpoint sp WHERE MONTH(f.date) = MONTH(CURRENT_DATE()) AND f.sp_name = sp.name " + dFilter + zone + user
    const rows = await connection.query(
      queryString
    )
    connection.release()
    return rows[0]
  }

  static async formsByMonth (fastify, zone, user) {
    const connection = await fastify.mysql.getConnection()
    const queryString = "SELECT YEAR(f.date), MONTH(f.date) as 'MONTH', COUNT(f.id_form) as 'COUNT' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -5 MONTH) AND f.sp_name = sp.name " + zone + user + ' GROUP BY YEAR(f.date), MONTH(f.date) ORDER BY YEAR(f.date) ASC'
    const rows = await connection.query(
      queryString
    )
    connection.release()
    return rows[0]
  }

  static async formsByMonthTBM (fastify, zone, user) {
    const connection = await fastify.mysql.getConnection()
    const queryString = "SELECT YEAR(f.date), MONTH(f.date) as 'MONTH', COUNT(f.id_form) as 'COUNT' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -5 MONTH) AND (f.id_user = " + user + ') AND f.sp_name = sp.name ' + zone + ' GROUP BY YEAR(f.date), MONTH(f.date) ORDER BY YEAR(f.date) ASC'
    const rows = await connection.query(
      queryString
    )
    connection.release()
    return rows[0]
  }

  static async formsByMonthManager (fastify, zone, user) {
    const connection = await fastify.mysql.getConnection()
    const queryString = "SELECT YEAR(f.date), MONTH(f.date) as 'MONTH', COUNT(f.id_form) as 'COUNT' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -5 MONTH) AND ((f.id_user IN (SELECT u.id_user FROM users u WHERE u.id_manager = " + user + ')) OR f.id_user = ' + user + ') AND f.sp_name = sp.name ' + zone + ' GROUP BY YEAR(f.date), MONTH(f.date) ORDER BY YEAR(f.date) ASC'
    const rows = await connection.query(
      queryString
    )
    connection.release()
    return rows[0]
  }

  static async formsByMonthAdmin (fastify, zone) {
    const connection = await fastify.mysql.getConnection()
    const queryString = "SELECT YEAR(f.date), MONTH(f.date) as 'MONTH', COUNT(f.id_form) as 'COUNT' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -5 MONTH) AND f.sp_name = sp.name " + zone + ' GROUP BY YEAR(f.date), MONTH(f.date) ORDER BY YEAR(f.date) ASC'
    const rows = await connection.query(
      queryString
    )
    connection.release()
    return rows[0]
  }

  static async averageTimeByMonth (fastify, zone, user) {
    const connection = await fastify.mysql.getConnection()
    const queryString = "SELECT YEAR(f.date), MONTH(f.date) as 'MONTH', AVG(f.duration) as 'DURATION' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -5 MONTH) AND f.sp_name = sp.name " + zone + user + ' GROUP BY YEAR(f.date), MONTH(f.date) ORDER BY YEAR(f.date) ASC'
    const rows = await connection.query(
      queryString
    )
    connection.release()
    return rows[0]
  }

  static async getRole (fastify, user) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_role FROM users WHERE id_user = ?',
      [user]
    )
    connection.release()
    return rows[0]
  }

  static async getId (fastify, mail) {
    const connection = await fastify.mysql.getConnection()
    const rows = await connection.query(
      'SELECT id_user,name, last_name  FROM users WHERE mail = ?',
      [mail]
    )
    connection.release()
    return rows[0]
  }
}
