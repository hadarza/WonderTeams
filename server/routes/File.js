const router = require('express').Router();
const FileController = require('../controllers/FileController')
var multer  = require('multer')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const File = require('../models/FilesPresent')
const storage = require('../middleware/GridFS')
const path = require('path')
const fs = require('fs')
const upload = storage;

//upload new file

router.post('/uploadFile',upload.single('file'), async(req,res) =>{
  // create a new file and save to DB
   const file = new File({
    Name: req.body.titleFolder,
     href: req.body.href,
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
router.post('/downloadFile', (req,res)=>{
 // gfs.find({filename: req.body.link}).toArray((err, files) => {
    // Check if files
 //   res.status(200).send(files.filename);
    // if (!files || files.length === 0) {
    //   return res.status(404).json({
    //     err: 'No files exist'
    //   });
   // }
   // console.log(files[0].filename)
    // if(files){
    //   const readstream = gfs.createReadStream({filename: files.filename});
    //   readstream.pipe(res);
    // }

  //   // Files exist
  //   return res.json(files);
  // });
   // Read output to browser
  // const readstream = gfs.createReadStream(req.body.href);
  // readstream.pipe(res);

  // on('error', function(error) {
  //   res.status(400).send(error)
  // }).
  // on('finish', function() {
  //   console.log('download done!');
  //   res.status(200).send("find!!")

 // });

 //})
})

module.exports = router;