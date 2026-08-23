const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please Provide The Company"]
    },
    body:{
        type:String,
        required:[true,"Please Provide The Company"]
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'user',
        required:[true,"Please Provide The User's Id"]
    }
}, { timestamps: true });

const Note = mongoose.model('note',NoteSchema)

module.exports = Note