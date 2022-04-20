const router = require('express').Router();
const FileShow = require('../model/FilesPresent')

router.post('/upload', (req,res) =>{
  return res.status(200).send({
    titleFolder: req.body.currentFile.titleFolder,
    categoryFolder: req.body.currentFile.categoryFolder,
    hrefFolder: req.body.currentFile.hrefFolder,
    Link: req.body.currentFile.Link
  })
  //send to mongodb
})



module.exports = router;