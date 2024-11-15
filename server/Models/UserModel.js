const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id : {
        type:String,
    },
    name : {
        type:String,
    },
    email: {
        type:String,
    },
    password: {
        type:String,
    }
})

module.exports = mongoose.model("User",UserSchema)