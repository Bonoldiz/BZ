/**
 * Error handler middleware
 */
const errorHandler = function(err, req, res, next){
   res.status(500);
   res.json({data:[],errors:[err.message]});
}


module.exports = { errorHandler }