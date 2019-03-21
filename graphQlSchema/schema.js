const graphql = require('graphql')

const teachers = require('../models/teacher')
const students = require('../models/students')
const attendance = require('../models/attendance')
const classes = require('./../models/courses')

const { GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInputObjectType } = graphql

const diary = [{
    year: 3,
    branch: 'CSE',
    classID: 'werytyhriug324',
    subject: 'Sex'
},
{
    year: 2,
    branch: 'IT',
    classID: 'weryvfdtyhriug324',
    subject: 'How to fuck your aunt'
}]    

const classList = new GraphQLObjectType({
    name: 'classList',
    fields: () => ({
        courseID: {type: GraphQLString},
        classID: {type: GraphQLString}
    })
})

const studentList = new GraphQLObjectType({
    name: 'studentList',
    fields: () => ({
        name: {type: GraphQLString},
        rollNumber: { type: GraphQLString },
        picture: { type: GraphQLString }
    })
})

const subjectList = new GraphQLObjectType({
    name: 'subjectList',
    fields: () => ({
        subject: {type: GraphQLString},
        courseID: {type: GraphQLString}
    })
})

const attendanceType = new GraphQLObjectType({
    name: 'attendanceType',
    fields: () => ({
        lectureNumber: {type: GraphQLInt},
        classID: {type: GraphQLString},
        courseID: { type: GraphQLString },
        rollNumber: {type: GraphQLString},
        date: {type: GraphQLString},
        present: {type: GraphQLBoolean}
    })
})

const attendanceInputType = new GraphQLInputObjectType({
    name: 'attendanceInputType',
    fields: () => ({
        lectureNumber: { type: GraphQLInt },
        classID: { type: GraphQLString },
        courseID: { type: GraphQLString },
        rollNumber: { type: GraphQLString },
        date: { type: GraphQLString },
        present: { type: GraphQLBoolean }
    })
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        classes: {
            type: new GraphQLList(classList),
            args: { id: {type: GraphQLString}},
            resolve: async (parent, args) => {
                const teacher = await teachers.findById(args.id)
                console.log(teacher)
                return teacher.diary
            }
        },
        students: {
            type: new GraphQLList(studentList),
            args: { classID: {type: GraphQLString}},
            resolve: async (parent, args) => {
                console.log(args.classID)
                const list = await students.find({ classID: args.classID })
                return list
            }
        },
        subjects: {
            type: new GraphQLList(subjectList),
            args: { classID: {type: GraphQLString}},
            resolve: async (parent, args) => {
                // const student = await students.findOne({rollNumber: args.rollNumber})
                console.log(args.classID)
                const subjects = await classes.findOne({classID: args.classID})
                console.log(subjects)
                return subjects.courses
            }
        },
        studentAttendance: {
            type: new GraphQLList(attendanceType),
            args: {courseID: {type: GraphQLString}, rollNumber: {type: GraphQLString}},
            resolve: async (parent, args) => {
                const attendance = await attendance.find({courseID: args.courseID, rollNumber: args.rollNumber})
                console.log(typeof attendance)
                return attendance
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        markAttendance: {
            type: new GraphQLList(attendanceType),
            args: {
                classAttendance: {type: new GraphQLList(attendanceInputType)}
            },
            resolve: async(parent, args) => {
                const save = await args.classAttendance.forEach((studentAttendance) => {
                    var newAttendance = new attendance(studentAttendance)
                    newAttendance.save()
                })
                return save
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation
})