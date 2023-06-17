const Metric = require('../models/metric')

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M5_H1

const nameMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

exports.fetchBy = async (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  const metricData = await Metric.fetchBy(this.fastify, dStart, dEnd, zone, user)
  return metricData
}

exports.fetchAverageTime = async (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  let dFilter = ''
  let zoneParam = ''
  let userParam = ''
  if (dStart !== 'null' && dEnd !== 'null') {
    dFilter = " AND (f.date BETWEEN '" + dStart + "' AND '" + dEnd + "') "
  } else { dFilter = '' }
  if (zone !== 'null') {
    zoneParam = ' AND (sp.id_state = ' + zone + ') '
  } else { zoneParam = '' }
  if (user !== 'null') {
    userParam = ' AND (f.id_user = ' + user + ') '
  } else { userParam = '' }
  const metricData = await Metric.averageTime(this.fastify, dFilter, zoneParam, userParam)

  const data = metricData[0].TIEMPO
  return data
}

exports.fetchAverageGradeCur = async (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  let dFilter = ''
  let zoneParam = ''
  let userParam = ''
  if (dStart !== 'null' && dEnd !== 'null') {
    dFilter = " AND (f.date BETWEEN '" + dStart + "' AND '" + dEnd + "') "
  } else { dFilter = ' AND (MONTH(f.date) = MONTH(CURRENT_DATE())) ' }
  if (zone !== 'null') {
    zoneParam = ' AND (sp.id_state = ' + zone + ') '
  } else { zoneParam = '' }
  if (user !== 'null') {
    userParam = ' AND (f.id_user = ' + user + ') '
  } else { userParam = '' }
  const metricData = await Metric.averageGradeCur(this.fastify, dFilter, zoneParam, userParam)

  return metricData
}

exports.fetchAverageGradeByMonth = async (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params

  let dFilter = ''
  let zoneParam = ''
  let userParam = ''
  if (dStart !== 'null' && dEnd !== 'null') {
    dFilter = " AND (f.date BETWEEN '" + dStart + "' AND '" + dEnd + "') "
  } else { dFilter = '' }
  if (zone !== 'null') {
    zoneParam = ' AND (sp.id_state = ' + zone + ') '
  } else { zoneParam = '' }
  if (user !== 'null') {
    userParam = ' AND (f.id_user = ' + user + ') '
  } else { userParam = '' }
  const metricData = await Metric.averageGradeByMonth(this.fastify, dFilter, zoneParam, userParam)

  const data = []
  const interior = []
  const exterior = []
  const manager = []
  const client = []
  const months = []

  for (let i = 0; i < metricData.length; i++) {
    interior.push((parseInt(metricData[i].EXTERIOR)))
    exterior.push(parseInt(metricData[i].INTERIOR))
    client.push(parseInt(metricData[i].CLIENT))
    manager.push(parseInt(metricData[i].MANAGER))
    months.push(nameMonths[(metricData[i].MONTH) - 1])
  }

  data.push({ name: 'Exterior', data: exterior })
  data.push({ name: 'Interior', data: interior })
  data.push({ name: 'Manager', data: manager })
  data.push({ name: 'Client', data: client })

  const datafull = [data, months]

  return (datafull)
}

exports.fetchAverageGradePDV = async (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  let dFilter = ''
  let zoneParam = ''
  let userParam = ''
  if (dStart !== 'null' && dEnd !== 'null') {
    dFilter = " AND (f.date BETWEEN '" + dStart + "' AND '" + dEnd + "') "
  } else { dFilter = '' }
  if (zone !== 'null') {
    zoneParam = ' AND (sp.id_state = ' + zone + ') '
  } else { zoneParam = '' }
  if (user !== 'null') {
    userParam = ' AND (f.id_user = ' + user + ') '
  } else { userParam = '' }
  const metricData = await Metric.averageGradePDV(this.fastify, dFilter, zoneParam, userParam)

  const data = metricData[0].PROMEDIO
  return data
}

exports.fetchFormsCurrentMonth = async (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  let dFilter = ''
  let zoneParam = ''
  let userParam = ''
  if (dStart !== 'null' && dEnd !== 'null') {
    dFilter = " AND (f.date BETWEEN '" + dStart + "' AND '" + dEnd + "') "
  } else { dFilter = '' }
  if (zone !== 'null') {
    zoneParam = ' AND (sp.id_state = ' + zone + ') '
  } else { zoneParam = '' }
  if (user !== 'null') {
    userParam = ' AND (f.id_user = ' + user + ') '
  } else { userParam = '' }
  const metricData = await Metric.formsCurrentMonth(this.fastify, dFilter, zoneParam, userParam)
  const data = metricData[0].FORMSCUR

  return data
}

exports.fetchFormsByMonth = async (request, reply) => {
  const { zone, user } = request.params
  let zoneParam = ''
  let userParam = ''
  if (zone !== 'null') {
    zoneParam = ' AND (sp.id_state = ' + zone + ') '
  } else { zoneParam = '' }
  if (user !== 'null') {
    userParam = ' AND (f.id_user = ' + user + ') '
  } else { userParam = '' }
  const metricData = await Metric.formsByMonth(this.fastify, zoneParam, userParam)

  const data = []
  const tours = []
  const months = []

  for (let i = 0; i < metricData.length; i++) {
    tours.push((parseInt(metricData[i].COUNT)))
    months.push(nameMonths[(metricData[i].MONTH) - 1])
  }

  data.push({ name: 'Recorridos', data: tours })

  const datafull = [data, months]
  
  return (datafull)
}

exports.fetchFormsByMonthUser = async (request, reply) => {
  const { zone, mail } = request.params
  let zoneParam = ''
  const userId = await Metric.getId(this.fastify, mail)
  const userData = await Metric.getRole(this.fastify, userId[0].id_user)
  const userParam = userId[0].id_user
  if (zone !== 'null') {
    zoneParam = ' AND (sp.id_state = ' + zone + ') '
  } else { zoneParam = '' }

  let metricData
  if (userData[0].id_role === 1) {
    metricData = await Metric.formsByMonthTBM(this.fastify, zoneParam, userParam)
  } else if (userData[0].id_role === 2) {
    metricData = await Metric.formsByMonthManager(this.fastify, zoneParam, userParam)
  } else if (userData[0].id_role === 3) {
    metricData = await Metric.formsByMonthAdmin(this.fastify, zoneParam)
  }

  const data = []
  const forms = []
  const months = []

  for (let i = 0; i < metricData.length; i++) {
    forms.push((parseInt(metricData[i].COUNT)))
    months.push(nameMonths[(metricData[i].MONTH) - 1])
  }

  data.push({ name: userId[0].name, data: forms })

  const datafull = [data, months]
  return datafull
}

exports.fetchAverageTimeByMonth = async (request, reply) => {
  const { zone, user } = request.params
  let zoneParam = ''
  let userParam = ''
  if (zone !== 'null') {
    zoneParam = ' AND (sp.id_state = ' + zone + ') '
  } else { zoneParam = '' }
  if (user !== 'null') {
    userParam = ' AND (f.id_user = ' + user + ') '
  } else { userParam = '' }
  const metricData = await Metric.averageTimeByMonth(this.fastify, zoneParam, userParam)

  const data = []
  const duration = []
  const months = []

  for (let i = 0; i < metricData.length; i++) {
    duration.push((parseInt(metricData[i].DURATION)))
    months.push(nameMonths[(metricData[i].MONTH) - 1])
  }

  data.push({ name: 'Tiempo Promedio', data: duration })

  const datafull = [data, months]

  return datafull
}

exports.fetchByMail = async (request, reply) => {
  const { mail } = request.params
  const userId = await Metric.getId(this.fastify, mail)
  return userId
}
