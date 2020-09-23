const { response } = require("express");
const { ValidationError } = require("yup");

/**
 * Error handler middleware
 */
const errorHandler = function(err, req, res, next){
   if(!res.statusCode || res.statusCode < 400)
      res.status(500);

   if(err instanceof ValidationError)
      res.json({data:[],errors:err.errors});
   else
      res.json({data:[],errors:[err.message]});

}


module.exports = { errorHandler }