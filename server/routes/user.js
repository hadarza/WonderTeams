const router = require('express').Router();
import userController from '../controllers/UserController'

router.post('/register', userController.UserRegister)
  
router.post('/login', userController.UserLogin)

module.exports = router;