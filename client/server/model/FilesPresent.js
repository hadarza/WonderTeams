const mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    href:{
        type:String,
        required:true,
    },
    Category:{
        type:String,
        allowedValues: ['Info','Web','Animate']
    },
    Link:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('FileShow',FileSchema)