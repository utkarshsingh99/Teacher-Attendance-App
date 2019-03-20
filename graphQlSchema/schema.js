const graphql = require('graphql')

const teachers = require('../models/teacher')
const students = require('../models/students')
const attendance = require('../models/attendance')

const { GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLList } = graphql

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
        year: {type: GraphQLInt},
        branch: {type: GraphQLString},
        classID: {type: GraphQLID},
        subject: {type: GraphQLString}
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
        classID: { type: GraphQLString },
        teacherName: { type: GraphQLString },
        teacherID: { type: GraphQLString }
    })
})

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        classes: {
            type: new GraphQLList(classList),
            args: { id: {type: GraphQLString}},
            resolve (parent, args) {
                teachers.findById(args.id)
                    .then(teacher => {
                        return teacher.diary
                    })
            }
        },
        students: {
            type: new GraphQLList(studentList),
            args: { classID: {type: GraphQLString}},
            resolve (parent, args) {
                students.find({ classes: {$all: {classID}} })
                    .then(list => {
                        return list
                    })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery
})