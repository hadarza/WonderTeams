const router = require('express').Router();
const FileController = require('../controllers/FileController')
//Load All files
router.get('/',FileController.LoadFiles)
  
// filter files by category
router.get('/:Name',FileController.FilterByCategory)

// search file in DashBoard by name
router.post('/search', FileController.SearchFileByName)

module.exports = router;