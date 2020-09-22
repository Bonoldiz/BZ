const { response } = require("express");

/**
 * Error handler middleware
 */
const errorHandler = function(err, req, res, next){
   if(!res.statusCode)
      res.status(500);
   res.json({data:[],errors:[err.message]});
}


module.exports = { errorHandler }