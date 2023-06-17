import axios from 'axios'

const apiRoute = 'https://back2basics.software/api/ftware/api/'

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

  /**
   * This is a static method that returns a single instance of the CurrentForm class.
   * @returns The `getInstance()` method is returning an instance of the `CurrentForm` class.
   */
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

  /**
   * The function loads all areas and questions asynchronously.
   */
  async loadFormInfo () {
    await this.loadAllAreas()
    await this.loadAllQuestions()
  }

  /**
   * The function sets the start time to the current time.
   */
  setStartTime () {
    const currentDate = new Date()
    this.startTime = currentDate.getTime()
  }

  /**
   * This function sets the end time to the current time.
   */
  setEndTime () {
    const currentDate = new Date()
    this.endTime = currentDate.getTime()
  }

  /**
   * The function calculates the elapsed time in minutes between a start and end time.
   * @returns The function `getElapsedMinutes` is returning the number of elapsed minutes between
   * `this.endTime` and `this.startTime`.
   */
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
      apiRoute + `section/getAreasBySection/${section}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // eslint-disable-line
        }
      }
    )
    loadedAreas.data.forEach((area) => {
      areaNames.push({ idArea: area.id_area, areaTitle: area.area_title })
    })

    return areaNames
  }

  /**
   * This function loads questions from a specific category and section using an API and organizes them
   * by area.
   * @param category - The category of questions to load, which is used in the API route to retrieve
   * the questions.
   * @param section - The `section` parameter is a string that represents the section of questions to
   * be loaded. It is used to retrieve questions from a specific section within a category.
   * @returns The function `loadQuestions` returns an array of arrays of objects representing the
   * questions for a given category and section.
   */
  async loadQuestions (category, section) {
    const currentSection = this.selectSection(section)

    const sectionQuestions = []
    const loadedQuestions = await axios.get(
      apiRoute + `question/bySection/${category}/${section}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // eslint-disable-line
        }
      }
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

  /**
   * This function sets a new answer for a specific question
   * @param section - The section of the questions being updated.
   * @param area - The "area" refers to a specific area within a section of questions.
   * @param question - The specific question within the given area of the selected section that needs
   * to be updated with a new answer.
   * @param newAnswer - The new answer that will be assigned to a specific question in a certain
   * section and area.
   */
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

  /**
   * The function `postForm` sends a form with various data and images to a server and optionally sends
   * emails to a list of recipients.
   * @param comment - A string containing the comment entered by the user.
   * @param managerName - The name of the manager who is being graded in the form.
   * @param mailList - `mailList` is an array of email addresses to which the report should be sent via
   * email.
   */
  async postForm (comments, managerName, mailList) {
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
    formData.append('comments', this.CommentJson(comments))
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
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // eslint-disable-line
      }
    })

    if (mailList.length > 0) {
      const mailData = new FormData()
      mailData.append('fileName', reportName)
      mailData.append('userName', userName)
      mailData.append('mails', this.MailJson(mailList))

      axios.post(apiRoute + 'form/sendEmails', mailData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // eslint-disable-line
        }
      })
    }
  }

  /**
   * The function generates a JSON string containing information about questions and their answers, as
   * well as calculates a grade based on the number of "yes" answers.
   * @param section - The section parameter is a variable that represents the section that
   * is used to select the appropriate set of questions and calculate the grades for that section.
   * @returns A JSON string representing the questions in a section, including their text, answer, and
   * file name.
   */
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

  /**
   * The function takes in a list of emails and returns a JSON string containing the emails.
   * @param mailList - The mailList parameter is an array of email addresses.
   * @returns A JSON string containing an array of email addresses, with the key "mails".
   */
  MailJson (mailList) {
    let json = '{"mails": ['
    mailList.forEach((mail) => {
      json += '"' + mail + '",'
    })

    json = json.substring(0, json.length - 1)
    json += ']}'

    return json
  }

  /**
   * The function converts a list of comments into a JSON string.
   * @param commentList - The parameter commentList is an array of comments that will be converted to a
   * JSON string.
   * @returns A JSON string containing an array of comments.
   */
  CommentJson (commentList) {
    let json = '{"comments": ['
    commentList.forEach((comment) => {
      json += '"' + comment.replace(/"/g, "'") + '",'
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
