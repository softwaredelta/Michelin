const Metric = require('../models/metric')
const User = require('../models/user')

const nameMonths = ['Enero','Febrero', 'Marzo', 'Abril', 'Junio', 'Julio','Agosto','Septiembre','Octubre', 'Noviembre', 'Diciembre'] 

exports.fetchBy = (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  const metricData = Metric.fetchBy(this.fastify, dStart, dEnd, zone, user)

  return metricData
}

exports.fetchAverageTime = (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  let dFilter = ""
  let zoneParam = ""
  let userParam = ""
  if (dStart != "null" && dEnd != "null") {
    dFilter = " AND (f.date BETWEEN '"+dStart+"' AND '"+dEnd+"') "
  } else {dFilter = ""}
  if (zone != "null"){
    zoneParam = " AND (sp.id_state = "+zone+") "
  } else {zoneParam = ""}
  if (user != "null"){
    userParam = " AND (f.id_user = "+user+") "
  } else {userParam = ""}
  const metricData = Metric.averageTime(this.fastify, dFilter, zoneParam, userParam)
  
  return metricData
}

exports.fetchAverageGrade = async (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  
  let dFilter = ""
  let zoneParam = ""
  let userParam = ""
  if (dStart != "null" && dEnd != "null") {
    dFilter = " AND (f.date BETWEEN '"+dStart+"' AND '"+dEnd+"') "
  } else {dFilter = ""}
  if (zone != "null"){
    zoneParam = " AND (sp.id_state = "+zone+") "
  } else {zoneParam = ""}
  if (user != "null"){
    userParam = " AND (f.id_user = "+user+") "
  } else {userParam = ""}
  const metricData = await Metric.averageGrade(this.fastify, dFilter, zoneParam, userParam)

  let data = []
  let interior = []
  let exterior = []
  let manager = []
  let client = []
  let months = []

  for(let i = 0; i < metricData.length; i++){
    interior.push(metricData[i].EXTERIOR)
    exterior.push(metricData[i].INTERIOR)
    client.push(metricData[i].CLIENT)
    manager.push(metricData[i].MANAGER)
    months.push(nameMonths[(metricData[i].MONTH)-1])
  }

  data.push({name: "Exterior", data: exterior})
  data.push({name: "Interior", data: interior})
  data.push({name: "Manager", data: manager})
  data.push({name: "Client", data: client})

  let datafull = [data,months]
  console.log(datafull)
  return (datafull)
  
}

exports.fetchAverageGradePDV = (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  let dFilter = ""
  let zoneParam = ""
  let userParam = ""
  if (dStart != "null" && dEnd != "null") {
    dFilter = " AND (f.date BETWEEN '"+dStart+"' AND '"+dEnd+"') "
  } else {dFilter = ""}
  if (zone != "null"){
    zoneParam = " AND (sp.id_state = "+zone+") "
  } else {zoneParam = ""}
  if (user != "null"){
    userParam = " AND (f.id_user = "+user+") "
  } else {userParam = ""}
  const metricData = Metric.averageGradePDV(this.fastify, dFilter, zoneParam, userParam)
  
  return metricData
}

exports.fetchFormsCurrentMonth = (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  let dFilter = ""
  let zoneParam = ""
  let userParam = ""
  if (dStart != "null" && dEnd != "null") {
    dFilter = " AND (f.date BETWEEN '"+dStart+"' AND '"+dEnd+"') "
  } else {dFilter = ""}
  if (zone != "null"){
    zoneParam = " AND (sp.id_state = "+zone+") "
  } else {zoneParam = ""}
  if (user != "null"){
    userParam = " AND (f.id_user = "+user+") "
  } else {userParam = ""}
  const metricData = Metric.formsCurrentMonth(this.fastify, dFilter, zoneParam, userParam)
  
  return metricData
}

exports.fetchFormsByMonth = (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  let zoneParam = ""
  let userParam = ""
  if (zone != "null"){
    zoneParam = " AND (sp.id_state = "+zone+") "
  } else {zoneParam = ""}
  if (user != "null"){
    userParam = " AND (f.id_user = "+user+") "
  } else {userParam = ""}
  const metricData = Metric.formsByMonth(this.fastify, zoneParam, userParam)
  
  return metricData
}

/*
exports.fetchFormsByMonthUser = (request, reply) => {
  const { dStart, dEnd, zone, user } = request.params
  let zoneParam = ""
  const userData = await User.getUserRole(this.fastify, user)
  let userParam = user
  if (zone != "null"){
    zoneParam = " AND (sp.id_state = "+zone+") "
  } else {zoneParam = ""}
  const metricData = Metric.formsByMonth(this.fastify, zoneParam, userParam)
  
  return metricData
}*/