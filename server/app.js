const express = require('express')
const graphQLHTTP = require('express-graphql') 
const schema = require('./schema/schema')
const testSchema = require('./schema/types_schema')


const app = express()

app.use('/graphql',graphQLHTTP({
    graphiql : true,
    schema: testSchema
}))

app.listen(4000, () => {
    console.log('port 4000')
})