const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
    company:{
        type:String,
        required:[true,"Please Provide The Company"]
    },
    position:{
        type:String,
        required:[true,"Please Provide The Company"]
    },
    status:{
        type:String,
        required:false,
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'user',
        required:[true,"Please Provide The User's Id"]
    }
}, { timestaps: true });

const Job = mongoose.model('job',JobSchema)

module.exports = Job