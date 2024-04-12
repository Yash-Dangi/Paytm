const jwt  = require('jsonwebtoken')
const JWT_SECRET = require('./config');
const authMiddleware = (req,res,next) => {
          // console.log('middleware_reached')
          const authorizationToken = req.headers.authorization;
          // console.log('authorization token ' + authorizationToken);
          if(!authorizationToken || !(authorizationToken.startsWith('Bearer ')))
          {
              
               res.status(403).json({});
          }
          const tokenArray = authorizationToken.split(' ');
          // console.log(tokenArray);
          const token = authorizationToken.split(' ')[1];
        //   console.log("Token is" + token);
          const verified = jwt.verify(token , JWT_SECRET);
          // console.log(verified);
          if(verified)
          {
            //    console.log(verified.userId);
               const userID = verified.userId;
               req.userId = userID;
               next();
          } 
          else
          {
               res.status(403).json({}); 
          }
}

module.exports  =  {
    authMiddleware
};