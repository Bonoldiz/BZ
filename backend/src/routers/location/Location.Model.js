const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const GenericSK = mongoose.Schema({
   nome: { type: String },
   codice: { type: String,index: true }
})

const Zona = mongoose.model("Zona", GenericSK);
const Provincia = mongoose.model("Provincia", GenericSK);
const Regione = mongoose.model("Regione", GenericSK);


const LocationSK = mongoose.Schema({
   nome: { type: String },
   codice: { type: String, index: true },
   zona: {type: mongoose.Schema.Types.ObjectId, ref: "Zona"},
   regione: {type: mongoose.Schema.Types.ObjectId, ref: "Regione"},
   provincia: {type: mongoose.Schema.Types.ObjectId, ref: "Provincia"},
   sigla: { type: String },
   codiceCatastale: { type: String },
   cap: { type: [String] },
   popolazione: { type: Number },
});

const Location = mongoose.model("Location", LocationSK);

const initLocation = async () => {
   // Drop the current collection
   Location.remove();
   Regione.remove();
   Provincia.remove();
   Zona.remove();
   
   // Load data from comuni.json
   const locations = path.join(__dirname, '../../', 'resources/comuni.json');

   fs.readFile(locations, { encoding: 'utf-8' }, async (err, data) => {
      if (!err) {
         const comuniParsed = JSON.parse(data);

         const session = await mongoose.startSession();

         // Start a mongodb generic places transaction
         session.startTransaction();

         comuniParsed.forEach(async element => {
            await Zona.findOneAndUpdate(element.zona,{},{upsert:true,useFindAndModify:false});
            await Provincia.findOneAndUpdate(element.provincia,{},{upsert:true,useFindAndModify:false});
            await Regione.findOneAndUpdate(element.regione,{},{upsert:true,useFindAndModify:false});
         });

         const placesTransaction = await session.commitTransaction();

         console.log(`Places init: ${!placesTransaction ? "✓" : "×"}`);
         

         // Start a mongodb location transaction
         session.startTransaction();

         comuniParsed.forEach(async element => {
            let newLocation = new Location({ 
               nome: element.nome,
               codice: element.codice,
               sigla: element.sigla,
               codiceCatastale: element.codiceCatastale,
               cap: element.cap,
               popolazione: element.popolazione,
            });

            newLocation.regione = (await Regione.findOne({codice:element.regione.codice}))._id
            newLocation.provincia = (await Provincia.findOne({codice:element.provincia.codice}))._id
            newLocation.zona = (await Zona.findOne({codice:element.zona.codice}))._id

            await newLocation.save();
         });

         const locationTransaction = await session.commitTransaction();

         session.endSession();

         console.log(`Locations init: ${!locationTransaction ? "✓" : "×"}`);
      } else {
         console.error(err);
      }
   })
}

/* (async () => {
   
}) */


module.exports = { Location, initLocation };