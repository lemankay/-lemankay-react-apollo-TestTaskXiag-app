const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports.auth = (context) => {
   //context = { ...headers }
xpired token');
      }
    }else{
       throw new Error('Вы не залогинены');
    } 
  }
 
};
