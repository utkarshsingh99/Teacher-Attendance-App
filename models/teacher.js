const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    diary: [{courseID: String, classID: String}]
})

const teachers = mongoose.model('teachers', teacherSchema)

module.exports = teachers