
const fs = require('fs')

const singleRectPos = [65, 150, 235, 320, 405, 490, 575, 660] // Fila page division coordinates
const blueColor = [66, 98, 130]

/* This function is called to create the pdf report that represent the auditorship a user makes. */
exports.generateReport = async (doc, bodyData, sellingPointData) => {
  // Get selling point data for report section
  const sellingPointQuestions = getSellingpointQuestions(sellingPointData, bodyData.managerName)

  const currentRect = { index: 0 } // File page division index/position

  // Generate pdf elements
  doc.addPage({ margin: 15 })
  addHeader(doc, bodyData.userName)
  doc.moveDown()

  addSellingPointSection(doc, currentRect, bodyData.duration)
  addQuestions(doc, sellingPointQuestions, currentRect, bodyData.userName)

  currentRect.index += 2 // Jump to new page

  addPreparationSection(doc, currentRect, bodyData.duration)
  addQuestions(doc, JSON.parse(bodyData.preparation).questions, currentRect, bodyData.userName)

  checkCurrentRect(doc, currentRect, bodyData.userName)
  addExteriorSection(doc, currentRect)
  addQuestions(doc, JSON.parse(bodyData.exterior).questions, currentRect, bodyData.userName)

  checkCurrentRect(doc, currentRect, bodyData.userName)
  addInteriorSection(doc, currentRect)
  addQuestions(doc, JSON.parse(bodyData.interior).questions, currentRect, bodyData.userName)

  checkCurrentRect(doc, currentRect, bodyData.userName)
  addClientSection(doc, currentRect)
  addQuestions(doc, JSON.parse(bodyData.client).questions, currentRect, bodyData.userName)

  checkCurrentRect(doc, currentRect, bodyData.userName)
  addManagerSection(doc, currentRect)
  addQuestions(doc, JSON.parse(bodyData.manager).questions, currentRect, bodyData.userName)

  checkCurrentRect(doc, currentRect, bodyData.userName)
  addCommentSection(doc, currentRect, getCommentText(JSON.parse(bodyData.comments)))

  doc.end()
}

/**
 * The function adds questions and their options to a PDF document based on their answer type and
 * current position on the page.
 * @param doc - a PDF document object that the function will add content to.
 * @param questions - an array of objects representing the questions to be added to the PDF document.
 * @param currentRect - currentRect is an object that contains information about the current position
 * of the rectangle on the PDF document.
 * @param userName - The name of the user for whom the document is being created.
 */
function addQuestions (doc, questions, currentRect, userName) {
  for (const questionNum in questions) {
    if (currentRect.index > 7 || (currentRect.index === 7 && questions[questionNum].answer === 4)) { // Reset rect index if end of file reached
      doc.addPage({ margin: 15 })
      addHeader(doc, userName)
      currentRect.index = 0
    }

    switch (questions[questionNum].answer) {
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
    currentRect.index += 1
  }
}

function addHeader (doc, userName) {
  doc.fillColor(blueColor)
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text(getCurrentDate(), 26, 20, {})
  doc.text('Recorrido BACK TO BASICS 2023 - ' + userName, 160, 20, { align: 'center', width: 300 })
  doc.image('./uploads/assets/Michelin-Logo.png', 470, 10, {
    fit: [120, 100],
    align: 'center'
  })
}

function addSellingPointSection (doc, currentRect, duration) {
  doc.fillColor(blueColor)

  doc.fontSize(18)
  doc.text(`${duration} minutos`, 420, singleRectPos[currentRect.index] + 30, { align: 'center' })
  doc.fontSize(18).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text('Tiempo del', 460, singleRectPos[currentRect.index] + 55)
  doc.text('Recorrido', 470, singleRectPos[currentRect.index] + 75)

  addSectionTitle(doc,
    currentRect,
    'DATOS DEL PUNTO',
    'DE VENTA VISITADO',
    'Sección para identificar qué Punto de Venta estás visitando para realizar el recorrido Back To Basics.'
  )
}

function addPreparationSection (doc, currentRect) {
  doc.fillColor(blueColor)
  addSectionTitle(doc,
    currentRect,
    'ETAPA 1',
    'PREPARACIÓN',
    'Necesitamos tener información previa a nuestra sesión sobre el Punto de Venta.'
  )
}

function addExteriorSection (doc, currentRect) {
  doc.fillColor(blueColor)
  addSectionTitle(doc,
    currentRect,
    'ETAPA 2',
    'EXTERIOR',
    'Sección para identificar esos elementos externos que te harían confiar en entrar al Punto de Venta.'
  )
}

function addInteriorSection (doc, currentRect) {
  doc.fillColor(blueColor)
  addSectionTitle(doc,
    currentRect,
    'ETAPA 3',
    'INTERIOR',
    'Sección para identificar esos elementos dentro del PDV que te harían tener una experiencia placentera en tu visita.'
  )
}

function addClientSection (doc, currentRect) {
  doc.fillColor(blueColor)
  addSectionTitle(doc,
    currentRect,
    'ETAPA 4',
    'ENTREVISTA CON USUARIO',
    'Sección de resultados de entrevista con algún cliente  que esté esperando sus trabajos y consigue que te cuente sobre su experiencia.'
  )
}

function addManagerSection (doc, currentRect) {
  doc.fillColor(blueColor)
  addSectionTitle(doc,
    currentRect,
    'ETAPA 5',
    'ENTREVISTA CON GERENTE',
    'Sección de resultados de entrevista con los responsables del PDV, con un enfoque en evaluar si están alineados con nuestra metodología RSVP.'
  )
}

function addCommentSection (doc, currentRect, comment) {
  doc.fillColor('black')
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text(comment, 55, singleRectPos[currentRect.index] + 100, { width: 480 })

  doc.fillColor(blueColor)
  addSectionTitle(doc,
    currentRect,
    'ACCIONES DE MEJORA',
    '',
    'Sección de comentarios donde se indican los compromisos puntuales de mejora y sus fechas de cumplimiento.'
  )
}

function addSingleAnswer (doc, currentRect, question) {
  addRectangle(doc, currentRect, 75)

  addQuestionText(doc,
    currentRect,
    question.text
  )

  doc.text(question.answerText, 410, singleRectPos[currentRect.index] + 25, { oblique: true, width: 160 }) // Answer
}

/**
 * The function adds a question with checkboxes and a checkmark to a PDF document.
 * @param doc - The PDF document object that the function is adding content to.
 * @param currentRect - The current rectangle being used to position the question and answer options.
 * @param question - The question object contains the text of the question and the answer option
 * selected by the user. The answer option is represented by a number (1, 2, or 3) which determines the
 * position of the checkmark in the checkbox.
 */
function addSingleOption (doc, currentRect, question) {
  addRectangle(doc, currentRect, 75)

  addQuestionText(doc,
    currentRect,
    question.text
  )

  doc.strokeColor('black')
  doc.fillColor('black')

  let answerXPos
  switch (question.answer) {
    case 1:
      answerXPos = [415, 420, 430]
      break

    case 2:
      answerXPos = [465, 470, 480]
      break

    case 3:
      answerXPos = [515, 520, 530]
      break
  }

  // Add check
  doc.moveTo(answerXPos[0], singleRectPos[currentRect.index] + 50)
    .lineTo(answerXPos[1], singleRectPos[currentRect.index] + 55)
    .lineTo(answerXPos[2], singleRectPos[currentRect.index] + 40)

  // Create Checkboxes
  doc.lineWidth(2)
  doc.roundedRect(410, singleRectPos[currentRect.index] + 35, 25, 25, 2).stroke()
  doc.text('SI', 415, singleRectPos[currentRect.index] + 17, { oblique: true })
  doc.roundedRect(460, singleRectPos[currentRect.index] + 35, 25, 25, 2).stroke()
  doc.text('NO', 462, singleRectPos[currentRect.index] + 17, { oblique: true })
  doc.roundedRect(510, singleRectPos[currentRect.index] + 35, 25, 25, 2).stroke()
  doc.text('N/A', 510, singleRectPos[currentRect.index] + 17, { oblique: true })
}

function addDoubleOption (doc, currentRect, question) {
  addRectangle(doc, currentRect, 160)

  addQuestionText(doc,
    currentRect,
    question.text
  )

  // Add question uploaded image
  try {
    doc.image('./uploads/temp/' + question.fileName, 390, singleRectPos[currentRect.index] + 5, {
      fit: [170, 150],
      align: 'center'
    })
    fs.unlinkSync('./uploads/temp/' + question.fileName) // Delete temp image
  } catch (err) {
    console.log(err)
  }

  doc.strokeColor('black')
  doc.fillColor('black')

  // Add check
  doc.moveTo(225, singleRectPos[currentRect.index] + 120)
    .lineTo(230, singleRectPos[currentRect.index] + 125)
    .lineTo(240, singleRectPos[currentRect.index] + 110)

  // Create checkboxes
  doc.lineWidth(2)
  doc.roundedRect(170, singleRectPos[currentRect.index] + 105, 25, 25, 2).stroke()
  doc.text('SI', 175, singleRectPos[currentRect.index] + 87, { oblique: true })
  doc.roundedRect(220, singleRectPos[currentRect.index] + 105, 25, 25, 2).stroke()
  doc.text('NO', 222, singleRectPos[currentRect.index] + 87, { oblique: true })
  doc.roundedRect(270, singleRectPos[currentRect.index] + 105, 25, 25, 2).stroke()
  doc.text('N/A', 270, singleRectPos[currentRect.index] + 87, { oblique: true })
}

function addSectionTitle (doc, currentRect, topTitle, secondTitle, info) {
  checkCurrentRect(doc, currentRect)

  let infoPos
  doc.fontSize(35).font('./uploads/fonts/PPTelegraf-UltraBold.otf')
  doc.text(topTitle, 45, singleRectPos[currentRect.index] + 20)

  if (secondTitle !== '') {
    doc.text(secondTitle, 45, singleRectPos[currentRect.index] + 55)
    infoPos = singleRectPos[currentRect.index] + 85
  } else {
    infoPos = singleRectPos[currentRect.index] + 50
  }

  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text(info, 45, infoPos,
    {
      width: 380
    })

  currentRect.index += 2
}

function addRectangle (doc, currentRect, size) {
  doc.strokeColor(blueColor)
  doc.fillColor(blueColor)
  doc.lineWidth(1)

  doc.roundedRect(45, singleRectPos[currentRect.index], 525, size, 2)
  doc.stroke()
}

function addQuestionText (doc, currentRect, text) {
  doc.fontSize(12).font('./uploads/fonts/RobotoSlab-Regular.ttf')
  doc.text(text, 55, singleRectPos[currentRect.index] + 5, { width: 330 })
  doc.fontSize(13).font('./uploads/fonts/RobotoSlab-Bold.ttf')
}

function checkCurrentRect (doc, currentRect, userName) {
  if (currentRect.index >= 7) { // Reset rect index if end of file reached
    doc.addPage({ margin: 15 })
    addHeader(doc, userName)
    currentRect.index = 0
  }
}

function getSellingpointQuestions (sellingPointData, managerName) { // Get first PDV questions in question list format
  const spStateQuestion = '¿En qué estado del país está el PDV?'
  const spNameQuestion = 'Nombre comercial del PDV'
  const spManagerQuestion = 'Nombre del encargado / contacto del PDV'
  const spRatingQuestion = '¿Qué calificación promedio en tiene el PDV según las opiniones en Google?'

  const questionObject = [
    { text: spStateQuestion, answer: 5, answerText: sellingPointData[0].zone },
    { text: spNameQuestion, answer: 5, answerText: sellingPointData[0].name },
    { text: spRatingQuestion, answer: 5, answerText: sellingPointData[0].rating },
    { text: spManagerQuestion, answer: 5, answerText: managerName }
  ]

  return questionObject
}

function getCommentText (commentObject) { // Full comment text
  const comment1 = `${(commentObject.comments[0] !== '') ? '\u2022 ' : ''}${commentObject.comments[0]}`
  const comment2 = `${(commentObject.comments[1] !== '') ? '\n\u2022 ' : ''}${commentObject.comments[1]}`
  const comment3 = `${(commentObject.comments[2] !== '') ? '\n\u2022 ' : ''}${commentObject.comments[2]}`

  const commentText = `${comment1}${comment2}${comment3}`

  return commentText
}

function getCurrentDate () { // Date for report
  const date = new Date().toLocaleDateString('en-IN')
  const dateObject = new Date()
  const time = dateObject.toGMTString().slice(17, 22)
  const currentDate = `${date} ${time} GMT`

  return currentDate
}
