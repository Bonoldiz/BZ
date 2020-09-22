const { getRouter } = require("../router");
const { Municipalita, Indirizzo, Regione, Provincia } = require("./Location.Model");
const { resourceValidator ,locationQueryValidator,indirizzoValidator} = require("./Location.validator");
const { errorHandler } = require("../../middlewares/error");
const LocationRouter = getRouter()


LocationRouter.route("/indirizzo")
   .get(async (req,res,next)=>{
      const indirizzi = await Indirizzo.find({}).exec();

      res.json({data:indirizzi});
   })
   .put(async (req,res,next) => {
      var indirizzo;
      try{
         indirizzo = await indirizzoValidator.validate(req.body);

         const assertsRegioneProvincia = await Promise.all([
            Regione.find({codice:indirizzo.regione}).exec().then(docs => docs.length ? null : new Error("Regione non valida")),
            Provincia.find({codice:indirizzo.provincia}).exec().then(docs => docs.length ? null : new Error("Provincia non valida")),
            Municipalita.find({codice:indirizzo.comune}).exec().then(docs => docs.length ? null : new Error("Comune non trovato")),
         ])

         for(const assertValoriIndirizzo of assertsRegioneProvincia){
            if(assertValoriIndirizzo instanceof Error) 
               return next(assertValoriIndirizzo)
         }

         // TODO create Indirizzo e return
         
      }catch(e){
         res.status(422);
         return next(e);
      }

      
      
   })


/* LocationRouter.get('/', async (req, res, next) => {
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

   res.json({data:resources});

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

   res.json({data:resource});
}) */

LocationRouter.use(errorHandler)

module.exports = { LocationRouter };