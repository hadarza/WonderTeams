const router = require('express').Router();
const User = require('../model/User')
const {RegisterValidation,LoginValidation} = require('../validation')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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
  module.exports = router;