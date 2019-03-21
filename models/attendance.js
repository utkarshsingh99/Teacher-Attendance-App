const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    lectureNumber: {
        type: Number
    },
    classID: {
        type: String,
        required: true
    },
    courseID: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    present: {
        type: Boolean,
        required: true
    }
})

const attendance = mongoose.model('attendance', attendanceSchema)

module.exports = attendance