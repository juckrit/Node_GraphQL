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
     {id:"2",name:"user2",age:22,profression:"prof2"},
     {id:"3",name:"user3",age:33,profression:"prof3"},
     {id:"4",name:"user4",age:44,profression:"prof4"},
     {id:"5",name:"user5",age:55,profression:"prof5"},
 ]
 var hobbiesData = [
    {id:"1",title:"user1",description:"hobby desc 1", userId: "1"},
    {id:"2",name:"user2",description:"hobby desc 2", userId: "1"},
    {id:"3",name:"user3",description:"hobby desc 3", userId: "1"},
    {id:"4",name:"user4",description:"hobby desc 4", userId: "1"},
    {id:"5",name:"user5",description:"hobby desc 5" , userId: "1"},
]
var postsData = [
    {id:"1",comment:"post comment 1", userId: "1"},
    {id:"2",comment:"post comment 2", userId: "1"},
    {id:"3",comment:"post comment 3", userId: "3"},
    {id:"4",comment:"post comment 4", userId: "3"},
    {id:"5",comment:"post comment 5" , userId: "2"},
]

const{

    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,


} = graphql


//Create type
const UserType = new GraphQLObjectType({
    name:'User',
    description:'Desc',
    fields: () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        age: {type : GraphQLInt},
        profression:{type: GraphQLString},
        posts:{
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return _.filter(postsData,{userId:parent.id})
            }
        },
        hobbies:{
            type: new GraphQLList(HobbyType),
            resolve(parent,args){
                return _.filter(hobbiesData,{userId:parent.id})
            }
        },
        
    })
})
const HobbyType = new GraphQLObjectType({
    name:'Hobby',
    description:'Hobby Desc',
    fields: () => ({
        id: {type : GraphQLID},
        title: {type : GraphQLString},
        description:{type: GraphQLString},
        user:{
            type:UserType,
            resolve(parent,args){
                //retrun data from our hobby
                return _.find(usersData,{id: parent.userId})
            }
        },
    })
})
const PostType = new GraphQLObjectType({
    name:'Post',
    description:'Post Desc',
    fields: () => ({
        id: {type : GraphQLID},
        comment: {type : GraphQLString},
        user:{
            type:UserType,
            resolve(parent,args){
                //retrun data from our hobby
                return _.find(usersData,{id: parent.userId})
            }
        },
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

//Mutation
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createUser:{
            type:UserType,
            args:{
                // id:{type:GraphQLString}
                name:{type:GraphQLString},
                age: {type:GraphQLInt},
                profression:{type: GraphQLString},
            },
            resolve(parent,args){
                let user = {
                    name:args.name,
                    age: args.age,
                    profression: args.profression
                }
                return user
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})