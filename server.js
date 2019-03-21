const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

mongoose.connect('mongodb://utki:123456a@ds119606.mlab.com:19606/teacher-attendance-app', {useNewUrlParser: true}, 
() => console.log('DB Connected'))

const schema = require('./graphQlSchema/schema')
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000, () => console.log('Port Up and Running'))