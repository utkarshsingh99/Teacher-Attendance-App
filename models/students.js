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
    classes: [
        {
            classID: {
                type: String
            },
            subject: {
                type: String
            },
            teacherName: {
                type: String
            },
            teacherID: {
                type: String            // Can also make this as a 'ref'
            }
        }
    ]
})

const students = mongoose.model('students', studentSchema)

module.exports = students