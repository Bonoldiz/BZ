const { getRouter } = require("../router");
const { Municipalita, Indirizzo, Regione, Provincia } = require("./Location.Model");
const { resourceValidator, locationQueryValidator, indirizzoValidator } = require("./Location.validator");
const { errorHandler } = require("../../middlewares/error");
const mongoose = require("mongoose");
const LocationRouter = getRouter()


LocationRouter.route("/indirizzo")
   .get(async (req, res, next) => {
      const indirizzi = await Indirizzo.find({}).populate("regione").populate("provincia").populate("municipalita").exec();

      res.json({ data: indirizzi });
   })
   .put(async (req, res, next) => {
      var indirizzo;
      var savedIndirizzo;
      var assertsIndirizzo;
      try {

         // Validazione degli input
         indirizzo = await indirizzoValidator.validate(req.body, { abortEarly: false });

         assertsIndirizzo = await Promise.all([
            Regione.findOne({ codice: indirizzo.regione }).exec().then(docs => docs ? docs : new Error("Regione non valida")),
            Provincia.findOne({ codice: indirizzo.provincia, regione: indirizzo.regione }).exec().then(docs => docs ? docs : new Error("Provincia non valida")),
            Municipalita.findOne({ codice: indirizzo.municipalita, provincia: indirizzo.provincia, regione: indirizzo.regione, cap: indirizzo.cap }).exec().then(docs => docs ? docs : new Error("Municipalità o CAP non trovato")),
         ])

         for (const assertValoriIndirizzo of assertsIndirizzo) {
            if (assertValoriIndirizzo instanceof Error)
               return next(assertValoriIndirizzo)
         }

         // Creazione del record a DB
         savedIndirizzo = new Indirizzo({
            ...indirizzo, ...{ regione: assertsIndirizzo[0], provincia: assertsIndirizzo[1], municipalita: assertsIndirizzo[2] }
         })

         savedIndirizzo = await savedIndirizzo.save();

         res.json({ data: savedIndirizzo });
      } catch (e) {
         res.status(422);
         return next(e);
      }
   })

LocationRouter.delete('/indirizzo/:id', async (req, res, next) => {
   var removedIndirizzo;
   try {
      removedIndirizzo = await Indirizzo.findOneAndDelete({ _id: req.params.id })

      if (!removedIndirizzo)
         throw new Error("Indirizzo non trovato")
   } catch (e) {
      res.status(422);
      return next(e)
   }
   res.json({ data: removedIndirizzo });
})

LocationRouter.get('/:resource', async (req, res, next) => {
   var requestedResource, resources;

   try {
      requestedResource = await resourceValidator.validate(req.params.resource);
   } catch (e) {
      return next(e);
   }

   switch (requestedResource) {
      case "regione":
         resources = await Regione.find({}).exec();
         break
      case "provincia":
         resources = await Provincia.aggregate([{
            "$lookup": {
               from: "regione",
               localField: "regione",
               foreignField: "codice",
               as: "regione"
            }
         }]).exec();
         break
      case "municipalita":
         resources = await Municipalita.aggregate([{
            "$lookup": {
               from: "regione",
               localField: "regione",
               foreignField: "codice",
               as: "regione"
            },

         }, {
            "$lookup": {
               from: "provincia",
               localField: "provincia",
               foreignField: "codice",
               as: "provincia"
            }
         }]).exec();
         break
   }

   res.json(resources);
})

LocationRouter.get('/:resource/:id', async (req, res, next) => {
   var requestedResource, resource;

   try {
      requestedResource = await resourceValidator.validate(req.params.resource);

      switch (requestedResource) {
         case "regione":
            resource = await Regione.find({ _id: mongoose.Types.ObjectId(req.params.id) }).exec();
            break
         case "provincia":
            resource = await Provincia.aggregate([
               { "$match": { _id: mongoose.Types.ObjectId(req.params.id) } },
               {
                  "$lookup": {
                     from: "regione",
                     localField: "regione",
                     foreignField: "codice",
                     as: "regione"
                  }
               }]).exec();
            break
         case "municipalita":
            resource = await Municipalita.aggregate([
               { "$match": { _id: mongoose.Types.ObjectId(req.params.id) } },
               {
                  "$lookup": {
                     from: "regione",
                     localField: "regione",
                     foreignField: "codice",
                     as: "regione"
                  },

               }, {
                  "$lookup": {
                     from: "provincia",
                     localField: "provincia",
                     foreignField: "codice",
                     as: "provincia"
                  }
               }]).exec();
            break
      }

      if (!resource.length) {
         res.status(422);
         throw new Error("Risorsa non trovata");
      }

      res.json(resource);
   } catch (e) {
      return next(e);
   }
})

LocationRouter.use(errorHandler)

module.exports = { LocationRouter };