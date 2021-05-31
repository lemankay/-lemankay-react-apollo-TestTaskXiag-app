const { ApolloServer, PubSub } = require('apollo-server');
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
var mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);

var pubsub = new PubSub();
const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({req}) => ({req, pubsub})
   });



// mongoose.connect('mongodb://localhost:27017/graphqlApolloTutorial?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
// { useNewUrlParser : true , })
mongoose.connect('mongodb+srv://movies_sream:IgJ0RMCxJ5GhlXXE@cluster0.8hzkr.mongodb.net/oneDbL?retryWrites=true&w=majority',
{useNewUrlParser: true})
.then(() => {
  console.log('MongoDB Connected');
  return server.listen({ port: process.env.PORT || 4000 })
})
.then((res) => {
  console.log(`Server running at ${res.url}`);
})
.catch(err => {
  console.error(err)
})
