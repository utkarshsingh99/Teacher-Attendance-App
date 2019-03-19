const graphql = require('graphql')

const { GraphQLObjectType, GraphQLSchema } = graphql

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

    }
})

module.exports = new GraphQLSchema({
    query: rootQuery
})