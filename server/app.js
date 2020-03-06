const express = require('express')
const graphQLHTTP = require('express-graphql') 
const schema = require('./schema/schema')


const app = express()

app.use('/graphql',graphQLHTTP({
    graphiql : true,
    schema: schema
}))

app.listen(4000, () => {
    console.log('port 4000')
})