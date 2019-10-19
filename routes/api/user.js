var express = require('express');
var router = express.Router();

const validateUser = require('./../../middleware/validate/user');
const UserController = require('./../../controllers/user');
const controller = new UserController();

/* GET home page. */
router.get('/', controller.list);
router.post('/', validateUser, controller.create);
router.post('/', controller.login);

module.exports = router;