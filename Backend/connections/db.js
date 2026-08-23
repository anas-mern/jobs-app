require('dotenv').config()
const mongoose = require('mongoose');

const connect_DB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected To Notes DataBase"))
    .catch(err=>console.error(err))
}


module.exports = connect_DB