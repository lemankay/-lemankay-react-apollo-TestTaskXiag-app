const jwt = require('jsonwebtoken');
const Movie = require('../models/movie.js');
const User = require('../models/user.js');
const { UserInputError, AuthenticationError, ApolloError } = require('apollo-server');
const { validateLogin } = require('../helper/validate');
const { validateRegister } = require('../helper/validate');
const { auth } = require('../helper/auth');
//const { subscribe } = require('graphql');
 function generateToken(user) {
  return jwt.sign(
    {
       id: user.id,
       email: user.email,
       username: user.username
   },
     "SOME PRIVAT KEY",
     { expiresIn: '1h'}
  );
 } 
  module.exports = {
 Query: {
   
    },
 Mutation: {
ubscribe: ( _, context) => context.pubsub.asyncIterator("НОВОЕ_КИНО")
      }
    }

  }

 
