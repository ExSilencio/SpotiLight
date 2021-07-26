const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    profileName: {
        type: String,
        required: true
    },
    profileId: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("User", userSchema, "users")
