const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports.auth = (context) => {
   //context = { ...headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token , "SOME PRIVAT KEY");
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }else{
       throw new Error('Вы не залогинены');
    } 
  }
 
};
