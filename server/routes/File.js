const router = require('express').Router();
const FileController = require('../controllers/FileController')
const File = require('../models/FilesPresent')
const storage = require('../middleware/GridFS')
const upload = storage;

//upload new file

router.post('/uploadFile',upload.single('file'), async(req,res) =>{
  // create a new file and save to DB
  console.log(req.body.titleFolder)
  console.log(req.body.hrefFolder)
  console.log(req.body.categoryFolder)
  console.log(req.file)

   const file = new File({
    Name: req.body.titleFolder,
     href: req.body.hrefFolder,
     Category: req.body.categoryFolder,
      Link: req.file.filename
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
router.get('/downloadFile/:filename', (req,res)=>{
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No files available",
      });
    }
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  });
})


// delete link (chunks DB)
router.delete('/deleteLink/:filename', (req,res)=>{
  // remove from files.chunks and uploads.files
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No files available",
      });
    }else{
      gfs.delete(files[0]._id);
    }
  });
})

// delete file
router.delete('/deleteFile/:fileName', FileController.deleteFile)

// check if filename is exist
router.get('/CheckExist/:fileName',FileController.IsExistFile)

module.exports = router;