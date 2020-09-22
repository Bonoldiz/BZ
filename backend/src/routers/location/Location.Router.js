const { getRouter } = require("../router");
const { Location,Region,Province,Zone } = require("./Location.Model");
const { resourceValidator ,locationQueryValidator} = require("./Location.validator");
const { errorHandler } = require("../../middlewares/error");
const LocationRouter = getRouter()

LocationRouter.get('/', async (req, res, next) => {
   var queryParams = {};
   try{
      queryParams = await locationQueryValidator.validate(req.query);
      if(queryParams.nome){
         queryParams.nome = {$regex: new RegExp(queryParams.nome), $options: 'i'}
      }
   }catch(e){
      return next(e);
   }
   
   const locations = await Location.find(queryParams).populate("regione").populate("provincia").populate("zona").exec();

   res.json({data:locations});
})

LocationRouter.get('/:resource', async (req, res, next) => {
   var resource;
   var resources;
   try {
      resource = await resourceValidator.validate(req.params.resource);
   } catch (e) {
      return next(e);
   }

   switch(resource){
      case "zone":
         resources = await Zone.find({}).exec();
         break;
      case "province":
         resources = await Province.find({}).exec();
         break;
      case "region":
         resources = await Region.find({}).exec();
         break;
   }

   if(!resources.length){
      res.status(404)
      return next(new Error("Not Found"));
   }

   res.json(resources);

})

LocationRouter.get("/:resource/:codice",async (req, res, next) => {
   var resource;
   var resources;
   try {
      resource = await resourceValidator.validate(req.params.resource);
   } catch (e) {
      return next(e);
   }

   switch(resource){
      case "zone":
         resources = await Zone.find({codice: req.params.codice}).exec();
         break;
      case "province":
         resources = await Province.find({codice: req.params.codice}).exec();
         break;
      case "region":
         resources = await Region.find({codice: req.params.codice}).exec();
         break;
   }

   if(!resources.length){
      res.status(404)
      return next(new Error("Not Found"));
   }

   res.json(resources);
})

LocationRouter.use(errorHandler)

module.exports = { LocationRouter };