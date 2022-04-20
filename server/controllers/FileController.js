const FileShow = require('../models/FilesPresent')

const LoadFiles = async (req,res)=>{
    try{
      const result = await FileShow.find({})
      return res.send(result)
    }catch(err){
      return res.status(400).send("failed to load data..")
    }
  }

  // filter file by category
  const FilterByCategory = async (req,res)=>{
    try{
      console.log("params "+ req.params['Name']);
      const result = await FileShow.find({Name: req.params['Name']})
      return res.send(result);
    }catch(err){
      return res.status(400).send("failed to load data..")
    }
  }

  const SearchFileByName = async(req,res)=>{
    try{
      const searchString = req.body.searchText;
      const ExistFile = await FileShow.find({Name: {$regex : searchString}});
      return res.status(200).send(ExistFile)
      }
      catch(err){
        return res.status(400).send("not found - UX UI NOT FOUND")
      }
  }


module.exports={
    LoadFiles,
    FilterByCategory,
    SearchFileByName
}