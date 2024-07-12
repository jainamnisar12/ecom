const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: [true, "email address alread taken"]
    },
    password: {
        type: String,
        required: [true, "Please add password"]
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);