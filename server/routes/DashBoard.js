const router = require('express').Router();
const FileShow = require('../model/FilesPresent')

//Load All files
router.get('/',async (req,res)=>{
    try{
      const result = await FileShow.find({})
      return res.send(result)
    }catch(err){
      return res.status(400).send("failed to load data..")
    }
  })
  
  // filter files by category
  router.get('/:Name',async (req,res)=>{
    try{
      console.log("params "+ req.params['Name']);
      const result = await FileShow.find({Name: req.params['Name']})
      return res.send(result);
    }catch(err){
      return res.status(400).send("failed to load data..")
    }
  })
  
  // search file in DashBoard by name
  router.post('/search', async(req,res)=>{
    try{
      const searchString = req.body.searchText;
      const ExistFile = await FileShow.find({Name: {$regex : searchString}});
      return res.status(200).send(ExistFile)
      }catch(err){
        return res.status(400).send("not found - UX UI NOT FOUND")
      }
  })

  module.exports = router;