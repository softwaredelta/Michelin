module.exports = class Metric {
  
    static async averageTime (fastify, dFilter, zone, user) {
      const connection = await fastify.mysql.getConnection()
      let filters = 'SELECT AVG(f.duration) AS "TIEMPO" FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -6 MONTH) AND f.sp_name = sp.name '+ dFilter + zone + user
      const rows = await connection.query(
        filters
      )
      connection.release()
      return rows[0]
    }

    static async averageGrade (fastify, dFilter, zone, user) {
      const connection = await fastify.mysql.getConnection()
      let queryString = "SELECT MONTH(f.date) AS 'MONTH', AVG(f.exterior_grade) AS 'EXTERIOR', AVG(f.interior_grade) AS 'INTERIOR', AVG(f.client_grade) AS 'CLIENT', AVG(f.store_manager_grade) AS 'MANAGER' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -6 MONTH) AND f.sp_name = sp.name "+ dFilter + zone + user +"GROUP BY MONTH(f.date)"
      const rows = await connection.query(
        queryString
      )
      connection.release()
      return rows[0]
    }

    static async averageGradePDV (fastify, dFilter, zone, user) {
      const connection = await fastify.mysql.getConnection()
      let queryString = "SELECT (sb.EXT+sb.INTE+sb.CLIENT+sb.MANAGER)/(4*1.0) as 'PROMEDIO' FROM (SELECT AVG(f.exterior_grade) AS EXT, AVG(f.interior_grade) AS INTE, AVG(f.client_grade) AS CLIENT, AVG(f.store_manager_grade) AS MANAGER FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -6 MONTH) AND f.sp_name = sp.name "+ dFilter + zone + user +") AS sb"
      const rows = await connection.query(
        queryString
      )
      connection.release()
      return rows[0]
    }

    static async formsCurrentMonth (fastify, dFilter, zone, user) {
      const connection = await fastify.mysql.getConnection()
      let queryString = "SELECT COUNT(f.id_form) AS 'FORMSCUR' FROM form f, sellingpoint sp WHERE MONTH(f.date) = MONTH(CURRENT_DATE()) AND f.sp_name = sp.name "+ dFilter + zone + user
      const rows = await connection.query(
        queryString
      )
      connection.release()
      return rows[0]
    }

    static async formsByMonth (fastify, zone, user) {
      const connection = await fastify.mysql.getConnection()
      let queryString = "SELECT MONTH(f.date) as 'MONTH', COUNT(f.id_form) as 'COUNT' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -6 MONTH) AND f.sp_name = sp.name " + zone + user + " GROUP BY MONTH(f.date)"
      const rows = await connection.query(
        queryString
      )
      connection.release()
      return rows[0]
    }

    static async formsByMonthTBM (fastify, zone, user) {
      const connection = await fastify.mysql.getConnection()
      let queryString = "SELECT MONTH(f.date) as 'MONTH', COUNT(f.id_form) as 'COUNT' FROM form f, sellingpoint sp WHERE f.date >= DATE_ADD(CURRENT_DATE(),INTERVAL -6 MONTH) AND (f.id_user = " + user + ") AND f.sp_name = sp.name " + zone + " GROUP BY MONTH(f.date)"
      const rows = await connection.query(
        queryString
      )
      connection.release()
      return rows[0]
    }
}