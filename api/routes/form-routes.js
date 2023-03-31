const formController = require('../controllers/form-controller')

const multer = require('fastify-multer')

<<<<<<< HEAD
const upload = multer({ dest: 'uploads/' })
=======
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/reports')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })
>>>>>>> 83187192f742b3aa55f66f369fe2b06f65598a70

async function formRoutes (fastify, options) {
  formController.fastify = fastify

  fastify.post(
    '/uploadReport',
<<<<<<< HEAD
    { preHandler: upload.array('reportImages', 15) },
=======
    { preHandler: upload.single('report') },
>>>>>>> 83187192f742b3aa55f66f369fe2b06f65598a70
    formController.postForm)

  fastify.get('/Reporte', formController.loadReport)
}

module.exports = formRoutes
