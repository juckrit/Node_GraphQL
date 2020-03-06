const graphql = require('graphql')
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');


//dummy data
 var usersData = [
     {id:"1",name:"user1",age:11},
     {id:"2",name:"user2",age:22},
     {id:"3",name:"user3",age:33},
     {id:"4",name:"user4",age:44},
     {id:"5",name:"user5",age:55},
 ]

const{

    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema

} = graphql


//Create type
const UserType = new GraphQLObjectType({
    name:'User',
    description:'Desc',
    fields: () => ({
        id: {type : GraphQLString},
        name: {type : GraphQLString},
        age: {type : GraphQLInt}
    })
})

//RootQuery 
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    description:"desc",
    fields: {
        user:{
            type:UserType,
            args:{id:    {type : GraphQLString}},

            resolve(parent,args){
                // let user = {
                //     id: "123",
                //     name: "john",
                //     age: 13
                // }
                // return user
                return _.find(usersData,{id: args.id})

                //We resolve with data
                //get and retrun data from datasource
            }
        }
    }
    
})


module.exports = new GraphQLSchema({
    query:RootQuery
})