const Section = require('../models/section')

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

exports.createSection = async (request, reply) =>{
  await Section.createSection(
    this.fastify,
    request.body.nameSection
  )
  return reply.code(200).send({ statusCode: 200 })
}
