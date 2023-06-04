import axios from 'axios'

const apiRoute = 'https://back2basics.software/api/'

export default class CurrentForm {
  static instance = null
  questions = {
    preparation: [],
    exterior: [],
    interior: [],
    client: [],
    manager: []
  }

  areas = {
    preparation: [],
    exterior: [],
    interior: [],
    client: [],
    manager: []
  }

  grades = {
    exterior: 0,
    interior: 0,
    client: 0,
    manager: 0
  }

  uploadImages = []
  idSp = 0
  spName = ''
  startTime = 0
  endTime = 0

  static getInstance () {
    if (CurrentForm.instance == null) {
      CurrentForm.instance = new CurrentForm()
    }
    return CurrentForm.instance
  }

  setSp (newIdSp, newSpName) {
    this.idSp = newIdSp
    this.spName = newSpName
  }

  async loadFormInfo () {
    await this.loadAllAreas()
    await this.loadAllQuestions()
  }

  setStartTime () {
    const currentDate = new Date()
    this.startTime = currentDate.getTime()
  }

  setEndTime () {
    const currentDate = new Date()
    this.endTime = currentDate.getTime()
  }

  getElapsedMinutes () {
    return Math.floor((this.endTime - this.startTime) / 60000)
  }

  async loadAllQuestions () {
    this.questions.preparation = await this.loadQuestions(1, 1)
    this.questions.exterior = await this.loadQuestions(1, 2)
    this.questions.interior = await this.loadQuestions(1, 3)
    this.questions.client = await this.loadQuestions(1, 4)
    this.questions.manager = await this.loadQuestions(1, 5)
  }

  async loadAllAreas () {
    this.areas.preparation = await this.loadAreas(1)
    this.areas.exterior = await this.loadAreas(2)
    this.areas.interior = await this.loadAreas(3)
    this.areas.client = await this.loadAreas(4)
    this.areas.manager = await this.loadAreas(5)
  }

  async loadAreas (section) {
    const areaNames = []
    const loadedAreas = await axios.get(
      apiRoute + `section/getAreasBySection/${section}`
    )
    loadedAreas.data.forEach((area) => {
      areaNames.push({ idArea: area.id_area, areaTitle: area.area_title })
    })

    return areaNames
  }

  async loadQuestions (category, section) {
    const currentSection = this.selectSection(section)

    const sectionQuestions = []
    const loadedQuestions = await axios.get(
      apiRoute + `question/bySection/${category}/${section}`
    )
    if (loadedQuestions.data.length < 1) {
      return []
    }
    let areaIndex = 0
    let currentArea = loadedQuestions.data[0].id_area
    let areaQuestions = []

    loadedQuestions.data.forEach((question) => {
      if (currentArea !== question.id_area) {
        currentArea = question.id_area
        sectionQuestions[areaIndex] = areaQuestions
        areaQuestions = []
        areaIndex += 1
      }

      while (this.areas[currentSection][areaIndex].idArea !== currentArea) {
        sectionQuestions[areaIndex] = []
        areaIndex += 1
      }

      areaQuestions.push({
        idQuestion: question.id_question,
        questionText: question.p_text,
        camera: question.camera,
        buttonNa: question.btn_na,
        placeHolder: question.picture,
        answer: 0,
        fileName: '',
        file: null
      })
    })
    sectionQuestions[areaIndex] = areaQuestions
    areaQuestions = []
    areaIndex += 1

    while (this.areas[currentSection].length > areaIndex) {
      sectionQuestions[areaIndex] = []
      areaIndex += 1
    }

    return sectionQuestions
  }

  getAreasBySection (section) {
    const currentSection = this.selectSection(section)

    return this.areas[currentSection]
  }

  getQuestionsByArea (section, area) {
    const currentSection = this.selectSection(section)

    return this.questions[currentSection][area]
  }

  getAnsweredQuestionsByArea (section, area) {
    const currentSection = this.selectSection(section)
    let answerCount = 0
    this.questions[currentSection][area].forEach((question) => {
      if (question.answer !== 0) {
        answerCount += 1
      }
    })

    return answerCount
  }

  getCompletionPercentage () {
    let sumAnswered = 0
    let sumTotal = 0

    // Used for instead of forEach because of unsafe references to variables sumAnswered and sumTotal
    for (let section = 1; section <= 5; section++) {
      const currentSection = this.selectSection(section)

      for (let area = 0; area < this.questions[currentSection].length; area++) {
        for (let question = 0; question < this.questions[currentSection][area].length; question++) {
          sumTotal += 1

          if (this.questions[currentSection][area][question].answer !== 0) {
            sumAnswered += 1
          }
        }
      }
    }

    const percentage = Math.floor((sumAnswered / sumTotal) * 100)

    return percentage
  }

  setAnswer (section, area, question, newAnswer) {
    const currentSection = this.selectSection(section)

    this.questions[currentSection][area][question].answer = newAnswer

    if (newAnswer !== 4 && newAnswer !== 2) {
      this.questions[currentSection][area][question].fileName = ''
      this.questions[currentSection][area][question].file = null
    }
  }

  setFile (section, area, question, file) {
    const currentDate = new Date()
    const currentSection = this.selectSection(section)

    this.questions[currentSection][area][question].file = file
    this.questions[currentSection][area][question].fileName =
      currentDate.getTime() + '-' + file.name
  }

  async postForm (comment, managerName, mailList) {
    const currentDate = new Date()

    const preparationJson = this.SectionJson(1)
    const exteriorJson = this.SectionJson(2)
    const interiorJson = this.SectionJson(3)
    const clientJson = this.SectionJson(4)
    const managerJson = this.SectionJson(5)

    const reportName = `Reporte_${localStorage.getItem('name')}_${currentDate.getTime()}` // eslint-disable-line
    const userName = localStorage.getItem('name') + ' ' + localStorage.getItem('lastName') // eslint-disable-line

    const formData = new FormData()
    formData.append("mail", localStorage.getItem("mail")); // eslint-disable-line
    formData.append('exteriorGrade', this.grades.exterior)
    formData.append('interiorGrade', this.grades.interior)
    formData.append('clientGrade', this.grades.client)
    formData.append('managerGrade', this.grades.manager)
    formData.append('spId', this.idSp)
    formData.append('fileName', reportName) // eslint-disable-line
    formData.append('duration', this.getElapsedMinutes())
    formData.append('comment', comment)
    formData.append('managerName', managerName)
    formData.append('preparation', preparationJson)
    formData.append('exterior', exteriorJson)
    formData.append('interior', interiorJson)
    formData.append('client', clientJson)
    formData.append('manager', managerJson)
    formData.append('userName', userName) // eslint-disable-line

    this.uploadImages.forEach((image) => {
      formData.append('images', image.file, image.fileName)
    })
    this.uploadImages = []

    await axios.post(apiRoute + 'form/postForm', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (mailList.length > 0) {
      const mailData = new FormData()
      mailData.append('fileName', reportName)
      mailData.append('userName', userName)
      mailData.append('mails', this.MailJson(mailList))

      axios.post(apiRoute + 'form/sendEmails', mailData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }

  SectionJson (section) {
    const currentSection = this.selectSection(section)

    let sumYes = 0
    let sumTotal = 0
    let sumNa = 0

    let json = '{"questions": ['
    this.questions[currentSection].forEach((questions) => {
      questions.forEach((question) => {
        sumTotal++

        json += '{"text":"' + question.questionText + '",'
        json += '"answer":' + question.answer + ', '
        json += '"fileName":"' + question.fileName + '"'
        json += '},'

        switch (question.answer) {
          case 1:
            sumYes++
            break
          case 3:
            sumNa++
            break
          case 4:
            this.uploadImages.push({
              file: question.file,
              fileName: question.fileName
            })
            break
          default:
            break
        }
      })
    })

    this.grades[currentSection] = Math.floor(
      (sumYes / (sumTotal - sumNa)) * 100
    )

    json = json.substring(0, json.length - 1)
    json += ']}'

    return json
  }

  MailJson (mailList) {
    let json = '{"mails": ['
    mailList.forEach((mail) => {
      json += '"' + mail + '",'
    })

    json = json.substring(0, json.length - 1)
    json += ']}'

    return json
  }

  selectSection (section) {
    let currentSection = ''
    switch (section) {
      case 1:
        currentSection = 'preparation'
        break
      case 2:
        currentSection = 'exterior'
        break
      case 3:
        currentSection = 'interior'
        break
      case 4:
        currentSection = 'client'
        break
      case 5:
        currentSection = 'manager'
        break
      default:
        break
    }

    return currentSection
  }
}
