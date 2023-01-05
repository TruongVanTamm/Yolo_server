const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    favorite: {
        type: Array,
        default: []
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/truongvantam/image/upload/v1656034929/yolo/feitkp4k0664v334luu8.png"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)