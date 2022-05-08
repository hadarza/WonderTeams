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
      const result = await FileShow.find({Category: req.params['Name']})
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

const deleteFile = async (req,res)=>{
  try{
    //check here
    let result = await FileShow.deleteOne({Name: req.params.fileName})
    return res.status(200).send("remove success")
    }
    catch(err){
      return res.status(400).send("not found - UX UI NOT FOUND")
    }
}

const IsExistFile = async (req,res)=>{
  try{
    //check here
    let result = await FileShow.findOne({Name: req.params.fileName})
    if(result) return res.status(200).send(true)
    return res.status(200).send(false)
    }
    catch(err){
      return res.status(400).send(false)
    }
}
module.exports={
    LoadFiles,
    FilterByCategory,
    SearchFileByName,
    deleteFile,
    IsExistFile
}