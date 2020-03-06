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


const{

    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull


} = graphql

/*
Scalar Type
*/

const PersonType = new GraphQLObjectType({
    name:"Person",
    description:"Person desc",
    fields: () =>({
        id:{type: GraphQLID},
        name:{type: new GraphQLNonNull(GraphQLString) },
        age:{type: new GraphQLNonNull(GraphQLInt)},
        isMarraied:{type:GraphQLBoolean},
        gpa:{type:GraphQLFloat},
        justAType:{
            type:PersonType,
            resolve(parent,args){
                return parent
            }
        }
    })
    
})



//RootQuery 
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    description:"desc",
    fields: {
        person:{
            type:PersonType,
            resolve(parent,args){
                let person = {
                    name:"sam",
                    age:25,
                    isMarraied:false,
                    gpa:3.5,

                }
                return person

            }
        },

       
    } 
    
})



module.exports = new GraphQLSchema({
    query:RootQuery,
})