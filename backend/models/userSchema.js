const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'name must not be empty']
        
    },
    email:{
        type:String,
        required:[true,'email must not be empty'],
        unique: true,

    },
    password:{
        type:String,
        required:[true,'password must not be empty']

    }
},{timestamps:true})


module.exports = mongoose.model('User', userSchema)