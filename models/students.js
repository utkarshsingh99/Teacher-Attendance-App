const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    rollNumber: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    year: {
        type: Number
    },
    branch: {
        type: String
    },
    classID: {
        type: String
    }
})

const students = mongoose.model('students', studentSchema)

module.exports = students