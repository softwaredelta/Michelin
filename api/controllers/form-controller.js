const Form = require('../models/form')
const PDFDocument = require('pdfkit')
const fs = require('fs')

const singleRectPos = [65, 150, 235, 320, 405, 490, 575, 660]
const blueColor = [66, 98, 130]

exports.postForm = async (request, reply) => {
  let currentRect = { index: 0 };
  // Create PDF
  const doc = new PDFDocument({autoFirstPage: false})
  doc.pipe(fs.createWriteStream('./uploads/reports/' + request.body.fileName + '.pdf'))
  doc.addPage({margin: 15})
  addHeader(doc, request.body.userName)
  doc.moveDown()

  addPreparationSection(doc, currentRect, request.body.duration)
  addQuestions(doc, JSON.parse(request.body.preparation).questions, currentRect, request.body.userName)

  checkCurrentRect(doc, currentRect, request.body.userName)
  addExteriorSection(doc, currentRect)
  addQuestions(doc, JSON.parse(request.body.exterior).questions, currentRect, request.body.userName)
  ////////////////////Con texto////////////////
  //addSingleOption(doc)
  //addSingleAnswer(doc)
  //addDoubleOption(doc, request.files[0].filename)
  //addExteriorSection(doc, 2)
  
  /*doc.addPage()
  addHeader(doc)
  addInteriorSection(doc, 0)
  addClientSection(doc, 2)
  addManagerSection(doc, 4)
  addCommentSection(doc, 6, 'JNADJNAK DJASND JAKND JAN KAJN SDJAS DKJAND ') */
  
  doc.end()

  await Form.createForm(this.fastify, 
    request.body.idCategory, 
    request.body.idUser, 
    request.body.exteriorGrade, 
    request.body.interiorGrade, 
    request.body.clientGrade, 
    request.body.managerGrade,
    request.body.spName, 
    request.body.fileName, 
    request.body.duration,
    getCurrentDateTimeSQL())

  return reply.code(200).send({ statusCode: 200 })
}

exports.loadReport = (request, reply) => {
  const stream = require('fs').createReadStream('./uploads/reports/' + request.params.fileName)
  reply.send(stream).type('application/pdf').code(200)
}

function addQuestions(doc, questions, currentRect, userName){
  for(let questionNum in questions){
    if(currentRect.index > 7 || (currentRect.index == 7 && questions[questionNum].answer == 4)){ //Reset rect index if end of file reached
      doc.addPage({margin: 15})
      addHeader(doc, userName)
      currentRect.index = 0
    }

    switch(questions[questionNum].answer){
      case 4:
        addDoubleOption(doc, currentRect, questions[questionNum])
        currentRect.index += 1
        break

      case 5:
        addSingleAnswer(doc, currentRect, questions[questionNum])
        break

      default:
        addSingleOption(doc, currentRect, questions[questionNum])
        break
    }
    currentRect.index += 1;
  }
}

function addHeader(doc, userName){
  doc.fillColor(blueColor)
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text(getCurrentDate(), 26, 20, {})
  doc.text('Recorrido BACK TO BASICS 2023 - ' + userName, 90, 20, {align: 'center'})
}

function addPreparationSection(doc, currentRect, duration){
  doc.fillColor(blueColor)

  doc.fontSize(18)
  doc.text(`${('0' + Math.floor(duration / 60)).slice(-2)}:${('0' + duration % 60).slice(-2)}`, 485, singleRectPos[currentRect.index]+40)
  doc.fontSize(18).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Tiempo del', 460, singleRectPos[currentRect.index]+55)
  doc.text('Recorrido',470, singleRectPos[currentRect.index]+75)

  addSectionTitle(doc, 
    currentRect, 
    'DATOS DEL PUNTO', 
    'DE VENTA VISITADO', 
    'Sección para identificar qué Punto de Venta estás visitando para realizar el recorrido Back To Basics'
  )
}

function addExteriorSection(doc, currentRect){
  doc.fillColor(blueColor)
  addSectionTitle(doc, 
    currentRect, 
    'ETAPA 2', 
    'EXTERIOR', 
    'Sección para identificar esos elementos externos que te harían confiar en entrar al Punto de Venta.'
  )
}

function addInteriorSection(doc, currentRect){
  doc.fillColor(blueColor)
  addSectionTitle(doc, 
    currentRect, 
    'ETAPA 3', 
    'INTERIOR', 
    'Sección para identificar esos elementos dentro del PDV que te harían tener una experiencia placentera en tu visita.'
  )
}

function addClientSection(doc, currentRect){
  doc.fillColor(blueColor)
  addSectionTitle(doc, 
    currentRect, 
    'ETAPA 4', 
    'ENTREVISTA CON USUARIO', 
    'Sección de resultados de entrevista con algún cliente  que esté esperando sus trabajos y consigue que te cuente sobre su experiencia.'
  )
}

function addManagerSection(doc, currentRect){
  doc.fillColor(blueColor)
  addSectionTitle(doc, 
    currentRect, 
    'ETAPA 5', 
    'ENTREVISTA CON GERENTE', 
    'Sección de resultados de entrevista con los responsables del PDV, con un enfoque en evaluar si están alineados con nuestra metodología RSVP.'
  )
}

function addCommentSection(doc, currentRect, comment){
  doc.fillColor(blueColor)
  addSectionTitle(doc, 
    currentRect, 
    'COMENTARIOS FINALES', 
    '', 
    'Sección de comentarios para generar los compromisos de mejora y sus fechas de cumplimiento.'
  )
  doc.fillColor('black')
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text(comment, 55, singleRectPos[currentRect.index]+100, {width: 480})
}

function addSingleAnswer(doc, currentRect, question){
  addRectangle(doc, currentRect, 75)

  addQuestionText(doc, 
    currentRect, 
    question.text
    )

  doc.text(question.answerText, 410, singleRectPos[currentRect.index]+25, {oblique: true, width: 160}) //Answer
}

function addSingleOption(doc, currentRect, question){
  addRectangle(doc, currentRect, 75)

  addQuestionText(doc, 
    currentRect, 
    question.text
    )

  doc.strokeColor('black')
  doc.fillColor('black')

  let answerXPos;
  switch (question.answer){
    case 1:
      answerXPos = [415, 420, 430]
      break

    case 2: 
      answerXPos= [465, 470, 480]
      break

    case 3:
      answerXPos = [515, 520, 530]
      break
  }

  doc.moveTo(answerXPos[0],singleRectPos[currentRect.index]+50) //y + 50
    .lineTo(answerXPos[1],singleRectPos[currentRect.index]+55) //+55
    .lineTo(answerXPos[2],singleRectPos[currentRect.index]+40) // + 40

  doc.lineWidth(2)
  doc.roundedRect(410,singleRectPos[currentRect.index]+35,25,25, 2).stroke() //+35y
  doc.text('SI', 415, singleRectPos[currentRect.index]+17,{oblique:true}) //+17y
  doc.roundedRect(460,singleRectPos[currentRect.index]+35,25,25, 2).stroke()
  doc.text('NO', 462, singleRectPos[currentRect.index]+17,{oblique:true})
  doc.roundedRect(510,singleRectPos[currentRect.index]+35,25,25, 2).stroke()
  doc.text('N/A', 510,singleRectPos[currentRect.index]+17,{oblique:true})
}

function addDoubleOption(doc, currentRect, question){
  addRectangle(doc, currentRect, 160)

  addQuestionText(doc, 
    currentRect, 
    question.text
    )

  //Add question uploaded image
  doc.image('./uploads/temp/' + question.fileName, 390, singleRectPos[currentRect.index]+5, {
    fit: [170, 150],
    align: 'center'
  })
  fs.unlinkSync('./uploads/temp/' + question.fileName) // Delete temp image

  doc.strokeColor('black')
  doc.fillColor('black')
  doc.moveTo(225,singleRectPos[currentRect.index]+120)
    .lineTo(230,singleRectPos[currentRect.index]+125)
    .lineTo(240,singleRectPos[currentRect.index]+110)

  doc.lineWidth(2)
  doc.roundedRect(170,singleRectPos[currentRect.index]+105,25,25, 2).stroke() //+35y 
  doc.text('SI', 175, singleRectPos[currentRect.index]+87,{oblique:true}) 
  doc.roundedRect(220,singleRectPos[currentRect.index]+105,25,25, 2).stroke() //+35 
  doc.text('NO', 222, singleRectPos[currentRect.index]+87,{oblique:true})
  doc.roundedRect(270,singleRectPos[currentRect.index]+105,25,25, 2).stroke() //+35
  doc.text('N/A', 270,singleRectPos[currentRect.index]+87,{oblique:true}) 
}

function addSectionTitle(doc, currentRect, topTitle, secondTitle, info){
  checkCurrentRect(doc, currentRect)

  let infoPos;
  doc.fontSize(35).font('./uploads/fonts/PPTelegraf-UltraBold.otf')
  doc.text(topTitle, 45, singleRectPos[currentRect.index]+20)

  if(secondTitle != ''){
    doc.text(secondTitle, 45, singleRectPos[currentRect.index]+55)
    infoPos = singleRectPos[currentRect.index]+85
  } else {
    infoPos = singleRectPos[currentRect.index]+50
  }

  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text(info, 45, infoPos, 
  {
    width: 380
  })

  currentRect.index += 2
}

function addRectangle(doc, currentRect, size){
  doc.strokeColor(blueColor)
  doc.fillColor(blueColor)
  doc.lineWidth(1)

  doc.roundedRect(45, singleRectPos[currentRect.index], 525, size, 2)
  doc.stroke()
}

function addQuestionText(doc, currentRect, text){
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text(text, 55, singleRectPos[currentRect.index]+5, {width: 330})
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Bold.ttf')
}

function checkCurrentRect(doc, currentRect, userName){
  if(currentRect.index >= 7){ //Reset rect index if end of file reached
    doc.addPage({margin: 15})
    addHeader(doc, userName)
    currentRect.index = 0
  }
}

function getCurrentDateTimeSQL(){
  let date = new Date();

  let currentDate = 
    date.getFullYear() + 
    ("0" + (date.getMonth() + 1)).slice(-2) + 
    ("0" + date.getDate()).slice(-2) + 
    ("0" + date.getHours() ).slice(-2) + 
    ("0" + date.getMinutes()).slice(-2) + 
    ("0" + date.getSeconds()).slice(-2)

  return currentDate
}

function getCurrentDate(){
  let date = new Date().toLocaleDateString("en-IN");
  const dateObject = new Date();
  let time = dateObject.toGMTString().slice(17,22);
  let currentDate = `${date} ${time} GMT`;;
  return currentDate
}
