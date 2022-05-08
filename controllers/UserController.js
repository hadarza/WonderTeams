const User = require('../models/User')
const {RegisterValidation,LoginValidation} = require('../validation/validation')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const UserRegister = async(req,res)=>{
    const {error} = RegisterValidation(req.body.Sendingdata);

    if(error) return res.status(400).send(error.details[0].message)

    // search if user is already exists
    const ExistUser = await User.findOne({Name: req.body.Sendingdata.Name}); 
    if(ExistUser) return res.status(400).send("user is exist");

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Sendingdata.Password,salt)

    // create a new user and save to DB
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

const UserLogin = async (req,res) =>{
    // sending an error 
    const {error} = LoginValidation(req.body.sendingData);
    if(error) return res.status(400).send(error.details[0].message)

    // don't match an exist user
    const ExistUser = await User.findOne({Name: req.body.sendingData.Name});
     if(!ExistUser) return res.status(400).send("User doesn't exist");

    // check if password is correct
      const validPass = await bcrypt.compare(req.body.sendingData.Password,ExistUser.Password)
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
}

module.exports = {
    UserRegister,
    UserLogin
}