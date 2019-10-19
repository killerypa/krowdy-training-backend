var express = require('express');
var router = express.Router();

const validateProduct = require('./../../middleware/validate/product');
const ProductController = require('./../../controllers/product');
const controller = new ProductController();

/* GET home page. */
router.get('/', controller.list);
router.post('/', validateProduct, controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;