const Section = require('../models/section')
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
// M4_H1
exports.getSections = (request, reply) => {
  const sectionData = Section.fetchAll(this.fastify)
  return sectionData
}

exports.getAreas = (request, reply) => {
  const areaData = Section.fetchAreas(this.fastify)
  return areaData
}

exports.getAreasBySection = (request, reply) => {
  const { idSection } = request.params
  const areaData = Section.fetchAreasBySection(this.fastify, idSection)

  return areaData
}
