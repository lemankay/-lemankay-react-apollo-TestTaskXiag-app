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
      async getMovies() {
        try {
             const movies = await Movie.find().sort();
             return movies;
        } catch(err) {
          console.log(err);
        }
      },
      async getUsers() {
        try {
             const users = await User.find().sort();
             return users;
        } catch(err) {
          console.log(err);
        }
      },
      async getMovie(_, { id }) {
        try {
          const movie = await Movie.findById(id);
          return movie;
     } catch(err) {
       console.log(err);
     }

      }
    },
 Mutation: {
      async addMovie(_,  {title,yes,no,date}, context) {
                 const user = auth(context);
                 try {
                    var newMovie = new Movie({
                        title,
                        yes,
                        no,
                        date,
                        username:user.username})
                      var movie = await newMovie.save();
                      context.pubsub.publish("NEW_MOVIE", { newMovie: movie })
                      return movie;
                 } catch (err) {
                   throw new Error("A Movie must have title")
                 }    
      },

      async register(_,{email,password,confirmPassword,username}  ){
        const { errors, validate } = validateRegister(email,password,confirmPassword,username);
          const user = await User.findOne( {username} ) 
          if(validate) {
            throw new UserInputError("Произошла ошибка", { errors })
          }
          if(user) {
            throw new UserInputError("Username is token", {
              errors: {
                username: "This username is token"
              }
            });
          } 
          const newUser = new User( {email,password,username} )
          const resolt = await newUser.save();
          const token = generateToken(resolt);
          return { ...resolt._doc, id: resolt._id, token }
        },

      async deleteMovie(_, {id}, context ) {
        const user = auth(context);
        try{
        const movie = await Movie.findById(id);
        if(user.username === movie.username) {
        await movie.delete();
        return "Movie delete"
        }else {
          throw new AuthenticationError("Действие запрещено")
        }
        }catch(err) {
          throw new Error("Leman Some error: ", err);
        }
      },
     
  

    async login(_,{ username, password } ) {
          const { errors, validate } = validateLogin(username, password);
          var user = await User.findOne({username});

          if(validate) {
            throw new UserInputError("Произошла ошибка", { errors })
          }
          if(!user) {
            errors.general = "Пользователь не найден"
            throw new UserInputError("Пользователь не найден", { errors })
          }
          var match = password === user.password && true;

          if(!match) {
            errors.general = "Пароль не совпадает"
            throw new UserInputError("Пароль не совпадает", { errors })
          }
          const token = generateToken(user);
          return {
            ...user._doc, id: user._id, token
          }
        }
    },
    Subscription: {
      newMovie: {
        subscribe: ( _, context) => context.pubsub.asyncIterator("НОВОЕ_КИНО")
      }
    }

  }

 