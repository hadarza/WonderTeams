const router = require('express').Router();
const FileController = require('../controllers/FileController')
var multer  = require('multer')
const upload = multer({ dest: './uploads' })

const File = require('../models/FilesPresent')

//upload new file

router.post('/uploadFile',upload.single('file'), async(req,res) =>{

  // create a new file and save to DB
   const file = new File({
    Name: req.body.titleFolder,
     href: req.file.filename,
     Category: req.body.categoryFolder,
     Link: "xxxx"
 });


  try{
    const savedFile = await file.save();
    
    res.status(200).send({
       titleFolder: file.Name,
       hrefFolder: req.file.filename,
       categoryFolder:file.Category,
       Link: file.Link
    })
   }catch(err){
    res.status(400).send(err);
  }
})

// update exist file
//router.post('/updateFile', FileController.updateFile)

module.exports = router;