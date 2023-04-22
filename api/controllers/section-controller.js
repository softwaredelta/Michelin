const Section = require('../models/section')

exports.getSections = (request, reply) => {
  const sectionData = Section.fetchAll(this.fastify)
  return sectionData
}

exports.getAreas = (request, reply) => {
  const areaData = Section.fetchAreas(this.fastify)
  return areaData
}
