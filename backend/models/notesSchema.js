const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, "Please provide user"],
    },
    title:{
        type:String,
        required:[true,'title must not be empty']
        
    },
    description:{
        type:String,
        required:[true,'discription must not be empty'],
        min:3

    },
    tag:{
        type:String,
        default: "General"
    },
},{timestamps:true})

module.exports = mongoose.model('Notes', noteSchema)