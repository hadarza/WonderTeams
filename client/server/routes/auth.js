const router = require('express').Router();
const User = require('../model/User')
const FileShow = require('../model/FilesPresent')
const {RegisterValidation,LoginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async(req,res)=>{
  const {error} = RegisterValidation(req.body.Sendingdata);
  console.log(error)
    if(error) return res.status(400).send(error.details[0].message)
    const ExistUser = await User.findOne({Name: req.body.Sendingdata.Name});  
    if(ExistUser) return res.status(400).send("user is exist");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Sendingdata.Password,salt)

    const user = new User({
      Name: req.body.Sendingdata.Name,
      Password: hashedPassword,
      Unit: req.body.Sendingdata.Unit,
      isAdmin:false
    });
      try{
        const savedUser = await user.save();

        // create and assign a token
          const accessToken = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
          console.log("user info "+user.Name)
          res.status(200).send({
            Name: user.Name,
            Unit:user.Unit,
            isAdmin: user.isAdmin,
            id: user._id
          })
        
      }
      catch(err){
        res.status(400).send(err);
      }
    } 
)


router.post('/login', async (req,res) =>{
    const {error} = LoginValidation(req.body.sendingData);
    if(error) return res.status(400).send(error.details[0].message)

    console.log(req.body.sendingData.Name);
    const ExistUser = await User.findOne({Name: req.body.sendingData.Name});
     if(!ExistUser) return res.status(400).send("User doesn't exist");

        // Password is correct
      const validPass = await bcrypt.compare(req.body.sendingData.Password,ExistUser.Password)
      console.log(req.body.sendingData.Password + " s" + ExistUser.Password) 
     if (!validPass) return res.status(400).send("Invalid password")
      try{
      // create and assign a token
      const accessToken = jwt.sign({_id:ExistUser._id},process.env.TOKEN_SECRET)

      res.status(200).send({
        Name: ExistUser.Name,
        Unit: ExistUser.Unit,
        isAdmin: ExistUser.isAdmin,
        id: ExistUser._id
      })
      }catch(err){
      return res.send("failed token");
    }
})

router.get('/DashBoard',async (req,res)=>{
  try{
    const result = await FileShow.find({})
    return res.send(result)
  }catch(err){
    return res.status(400).send("failed to load data..")
  }
})


router.get('/DashBoard/:Name',async (req,res)=>{
  try{
    console.log("params "+ req.params['Name']);
    const result = await FileShow.find({Name: req.params['Name']})
    return res.send(result);
  }catch(err){
    return res.status(400).send("failed to load data..")
  }
})

router.post('/upload', (req,res) =>{
  return res.status(200).send({
    titleFolder: req.body.currentFile.titleFolder,
    categoryFolder: req.body.currentFile.categoryFolder,
    hrefFolder: req.body.currentFile.hrefFolder,
    Link: req.body.currentFile.Link
  })
  //send to mongodb
})



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