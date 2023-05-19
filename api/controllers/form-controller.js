const Form = require('../models/form')
const PDFDocument = require('pdfkit')
const fs = require('fs')

/*
  doc.roundedRect(45, 65, 525, 75, 2)
  doc.roundedRect(45, 150, 525, 75, 2)
  doc.roundedRect(45, 235, 525, 75, 2)
  doc.roundedRect(45, 320, 525, 75, 2)
  doc.roundedRect(45, 405, 525, 75, 2)
  doc.roundedRect(45, 490, 525, 75, 2)
  doc.roundedRect(45, 575, 525, 75, 2)
  doc.roundedRect(45, 660, 525, 75, 2)

*/

const singleRectPos = [65, 150, 235, 320, 405, 490, 575, 660]
const blueColor = [66, 98, 130]

exports.postForm = async (request, reply) => {
  let currentRect = 2;
  // Create PDF
  const doc = new PDFDocument({autoFirstPage: false})
  doc.pipe(fs.createWriteStream('./uploads/reports/' + request.body.fileName + '.pdf'))
  doc.addPage({margin: 15})
  addHeader(doc)
  doc.moveDown()
  addPreparationSection(doc)
  
  ////////////////////Con texto////////////////
  addSingleOption(doc)
  addSingleAnswer(doc)
  addDoubleOption(doc, request.files[0].filename)
  addExteriorSection(doc)
  doc.addPage()
  addHeader(doc)
  addInteriorSection(doc)
  addClientSection(doc)
  addManagerSection(doc)
  addCommentSection(doc)
  
  doc.end()

  await Form.createForm(this.fastify, 1, 2, 1, 1, 1, 1, 'test sp', request.body.fileName, 1, '01/01/2020')
  return reply.code(200).send({ statusCode: 200 })
}

exports.loadReport = (request, reply) => {
  const stream = require('fs').createReadStream('./uploads/reports/' + request.params.fileName)
  reply.send(stream).type('application/pdf').code(200)
}

function addHeader(doc){
  doc.fillColor(blueColor)
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Fecha', 26, 20, {})
  doc.text('Recorrido BACK TO BASICS 2023 - VAriblbe', 90, 20, {align: 'center'})
}

function addPreparationSection(doc){
  doc.fontSize(35).font('./uploads/fonts/PPTelegraf-UltraBold.otf')
  doc.text('DATOS DEL PUNTO', 45, 85)
  doc.text('DE VENTA VISITADO', 45, 120)
  doc.fontSize(18)
  doc.text('00:00', 480, 105)
  doc.fontSize(18).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Tiempo del', 460, 120)
  doc.text('Recorrido',470, 140)
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Sección para identificar qué Punto de Venta estás visitando para realizar el recorrido Back To Basics', 45, 150, 
  {
    width: 380
  })
}

function addExteriorSection(doc){
  doc.fillColor(blueColor)
  doc.fontSize(35).font('./uploads/fonts/PPTelegraf-UltraBold.otf')
  doc.text('ETAPA 2', 45, 595)
  doc.text('EXTERIOR', 45, 630)
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Sección para identificar esos elementos externos que te harían confiar en entrar al Punto de Venta.', 45, 660, 
  {
    width: 380
  })
}

function addInteriorSection(doc){
  doc.fillColor(blueColor)
  doc.fontSize(35).font('./uploads/fonts/PPTelegraf-UltraBold.otf')
  doc.text('ETAPA 3', 45, 85)
  doc.text('INTERIOR', 45, 120)
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Sección para identificar esos elementos dentro del PDV que te harían tener una experiencia placentera en tu visita.', 45, 150, 
  {
    width: 380
  })
}

function addClientSection(doc){
  doc.fillColor(blueColor)
  doc.fontSize(35).font('./uploads/fonts/PPTelegraf-UltraBold.otf')
  doc.text('ETAPA 4', 45, 255)
  doc.text('ENTREVISTA CON USUARIO', 45, 290)
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Sección de resultados de entrevista con algún cliente  que esté esperando sus trabajos y consigue que te cuente sobre su experiencia.', 45, 320, 
  {
    width: 380
  })
}

function addManagerSection(doc){
  doc.fillColor(blueColor)
  doc.fontSize(35).font('./uploads/fonts/PPTelegraf-UltraBold.otf')
  doc.text('ETAPA 5', 45, 425)
  doc.text('ENTREVISTA CON GERENTE', 45, 460)
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Sección de resultados de entrevista con los responsables del PDV, con un enfoque en evaluar si están alineados con nuestra metodología RSVP.', 45, 490, 
  {
    width: 380
  })
}

function addCommentSection(doc){
  doc.fillColor(blueColor)
  doc.fontSize(35).font('./uploads/fonts/PPTelegraf-UltraBold.otf')
  doc.text('COMENTARIOS FINALES', 45, 595)
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Sección de comentarios para generar los compromisos de mejora y sus fechas de cumplimiento.', 45, 625, 
  {
    width: 380
  })
  doc.fillColor('black')
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('¿Los residuos peligrosos (estopas,tambos, botes, guantes contaminados, escobas, trapeadores, cubetas, etc) y llantas de desecho son debidamente confinados y fuera del alcance de vista de los clientes?', 55, 675, {width: 480})
}

function addRects(doc){
  doc.strokeColor(blueColor)
  doc.lineWidth(1)
  doc.stroke()
}

function addSingleAnswer(doc){
  doc.strokeColor(blueColor)
  doc.fillColor(blueColor)
  doc.lineWidth(1)

  doc.roundedRect(45, 320, 525, 75, 2)
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('¿Los residuos peligrosos (estopas,tambos, botes, guantes contaminados, escobas, trapeadores, cubetas, etc) y llantas de desecho son debidamente confinados y fuera del alcance de vista de los clientes?', 55, 325, {width: 330})
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Bold.ttf')
  doc.text('Exito maestro ds ds sdf sdf sdfsdfsdf',410,345,{oblique: true, width: 160}) //Answer
  doc.stroke()
}

function addSingleOption(doc){
  doc.strokeColor(blueColor)

  doc.roundedRect(45, 235, 525, 75, 2)
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('¿Los residuos peligrosos (estopas,tambos, botes, guantes contaminados, escobas, trapeadores, cubetas, etc) y llantas de desecho son debidamente confinados y fuera del alcance de vista de los clientes?', 55, 240, {width: 330}) //+5
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Bold.ttf')
  doc.stroke()
  doc.strokeColor('black')
  doc.fillColor('black')
  doc.moveTo(415,285) //y + 50
    .lineTo(420,290) //+55
    .lineTo(430,275) // + 40
  doc.lineWidth(2)
  doc.roundedRect(410,270,25,25, 2).stroke() //+35y
  doc.text('SI', 415, 252,{oblique:true}) //+17y
  doc.roundedRect(460,270,25,25, 2).stroke()
  doc.text('NO', 462, 252,{oblique:true})
  doc.roundedRect(510,270,25,25, 2).stroke()
  doc.text('N/A', 510, 252,{oblique:true})
}

function addDoubleOption(doc, questionFileName){
  doc.strokeColor(blueColor)

  doc.roundedRect(45, 405, 525, 160, 2)
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('¿Los residuos peligrosos (estopas,tambos, botes, guantes contaminados, escobas, trapeadores, cubetas, etc) y llantas de desecho son debidamente confinados y fuera del alcance de vista de los clientes?', 55, 410, {width: 330}) //+5
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Bold.ttf')
  doc.stroke()

  //Add question uploaded image
  doc.image('./uploads/temp/' + questionFileName, 390, 410, {
    fit: [170, 150],
    align: 'center'
  })
  fs.unlinkSync('./uploads/temp/' + questionFileName)

  doc.strokeColor('black')
  doc.fillColor('black')
  doc.moveTo(175,525)
    .lineTo(180,530)
    .lineTo(190,515)
  doc.lineWidth(2)
  doc.roundedRect(170,510,25,25, 2).stroke() //+35y 
  doc.text('SI', 175, 492,{oblique:true}) 
  doc.roundedRect(220,510,25,25, 2).stroke() //+35 
  doc.text('NO', 222, 492,{oblique:true})
  doc.roundedRect(270, 510,25,25, 2).stroke() //+35
  doc.text('N/A', 270, 492,{oblique:true}) 
}
