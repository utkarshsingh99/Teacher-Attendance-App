const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    diary: [{
            year: {
                type: Number
            },
            branch: {
                type: String
            },
            classID: {
                type: String
            },
            subject: {
                type: String
            }
        }]
})

const teachers = mongoose.model('teachers', teacherSchema)

module.exports = teachers