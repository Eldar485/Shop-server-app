const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/', productController.create)
router.get('/', productController.getAll)
router.get('/new-collection', productController.getNewCollection)
router.get('/:id', productController.getOne)

module.exports = router