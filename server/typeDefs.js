const { gql } = require('apollo-server');
module.exports = gql`
  scalar DateTime
  type Movie { 
               id: ID!
               title: String! 
               yes: String
               no: String
               date: Int 
               username: String!
               createdAt: DateTime
              }
  type Query {   getMovies: [Movie]
                 getMovie(id:ID!): Movie
                 getUsers: [User]
  }
  type User {
                 id: ID!
                 username: String!
                 token: String!
                 email: String! 
                 password: String! 
                 getMovies: [Movie]
                }
  input InputRegister {
                       email: String! 
                       password: String! 
                       confirmPassword:String!  
                       username: String!
                      }
  input InputMovie {
                    title:String!
                    date: Int  
  }          

  type Mutation {
    register(email: String!, password: String!, confirmPassword:String!,username: String!): User!
    login(username:String! password:String!):User! 
    addMovie( title:String! yes:String no:String date: Int ): Movie!
    deleteMovie(id: ID!): Movie!
    updateMovie(id:ID!, date:Int,title:String): Movie!
  }
  type Subscription {
    newMovie: Movie!
  }
  `