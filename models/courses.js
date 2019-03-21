const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    classID: {                                  // {Year(1/2/3/4)}{Branch(1 - CSE/2 - IT/3 - ECE)}
        type: String,
        required: true
    },
    courses: [
        {
            subject: String,
            courseID: String                    // {Year(1/2/3/4)}{Branch(1 - CSE/2 - IT/3 - ECE)}{Subject Code As In Syllabus}
        }
    ]
})

const classes = mongoose.model('classes', classSchema)

module.exports = classes