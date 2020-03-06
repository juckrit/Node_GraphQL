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
     {id:"1",name:"user1",age:11,profression:"prof1"},
     {id:"2",name:"user2",age:22,profression:"prof1"},
     {id:"3",name:"user3",age:33,profression:"prof1"},
     {id:"4",name:"user4",age:44,profression:"prof1"},
     {id:"5",name:"user5",age:55,profression:"prof1"},
 ]
 var hobbiesData = [
    {id:"1",title:"user1",description:"hobby desc 1"},
    {id:"2",name:"user2",description:"hobby desc 1"},
    {id:"3",name:"user3",description:"hobby desc 1"},
    {id:"4",name:"user4",description:"hobby desc 1"},
    {id:"5",name:"user5",description:"hobby desc 1" },
]
var postsData = [
    {id:"1",comment:"post comment 1"},
    {id:"2",comment:"post comment 2"},
    {id:"3",comment:"post comment 3"},
    {id:"4",comment:"post comment 4"},
    {id:"5",comment:"post comment 5" },
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
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        age: {type : GraphQLInt},
        profression:{type: GraphQLString}
        
    })
})
const HobbyType = new GraphQLObjectType({
    name:'Hobby',
    description:'Hobby Desc',
    fields: () => ({
        id: {type : GraphQLID},
        title: {type : GraphQLString},
        description:{type: GraphQLString}
    })
})
const PostType = new GraphQLObjectType({
    name:'Post',
    description:'Post Desc',
    fields: () => ({
        id: {type : GraphQLID},
        comment: {type : GraphQLString}
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
        },

        hobby:{
            type:HobbyType,
            args:{id: {type:GraphQLID}},
            resolve(parent,args){
                //retrun data from our hobby
                return _.find(hobbiesData,{id: args.id})
            }
        },

        post:{
            type:PostType,
            args:{id: {type:GraphQLID}},
            resolve(parent,args){
                //retrun data from our hobby
                return _.find(postsData,{id: args.id})
            }
        },
    }
    
})


module.exports = new GraphQLSchema({
    query:RootQuery
})