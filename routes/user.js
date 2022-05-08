const router = require('express').Router();
userController = require ('../controllers/UserController')

router.post('/register', userController.UserRegister)
  
router.post('/login', userController.UserLogin)

module.exports = router;