const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const GenericSK = mongoose.Schema({
   nome: { type: String },
   codice: { type: String,index: true }
})

const Zona = mongoose.model("Zona", GenericSK,"zone");
const Provincia = mongoose.model("Provincia", GenericSK,"province");
const Regione = mongoose.model("Regione", GenericSK,"region");


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

const Location = mongoose.model("Location", LocationSK,"location");

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
         
         var session = await mongoose.startSession();
         
         try{
            // Start a mongodb generic places transaction
            session.startTransaction();

            comuniParsed.forEach(async element => {
               await Zona.findOneAndUpdate(element.zona,element.zona,{upsert:true,useFindAndModify:false,session:session});
               await Provincia.findOneAndUpdate(element.provincia,element.provincia,{upsert:true,useFindAndModify:false,session:session});
               await Regione.findOneAndUpdate(element.regione,element.regione,{upsert:true,useFindAndModify:false,session:session});
            });
            
            await session.commitTransaction();

            console.log(`Places init: ✓`);

            // Start mongodb location transaction
            await session.startTransaction();

            comuniParsed.forEach(async element => {
               let newLocation = new Location({ 
                  nome: element.nome,
                  codice: element.codice,
                  sigla: element.sigla,
                  codiceCatastale: element.codiceCatastale,
                  cap: element.cap,
                  popolazione: element.popolazione,
                  //regione : (await Regione.findOne({codice:element.regione.codice}).exec())._id,
                  //provincia : (await Provincia.findOne({codice:element.provincia.codice}).exec())._id,
                  //zona: (await Zona.findOne({codice:element.zona.codice}).exec())._id
               });

               newLocation.regione = await (await Regione.findOne({codice:element.regione.codice}).exec())._id;
               newLocation.provincia = await (await Provincia.findOne({codice:element.provincia.codice}).exec())._id,
               newLocation.zona = await (await Zona.findOne({codice:element.zona.codice}).exec())._id;

               await newLocation.save({session});
            });

            await session.commitTransaction();

            console.log(`Locations init: ✓`);
            
         }catch(e){
            console.log(e);

            await session.abortTransaction();
            session.endSession();

            console.log(`Places init: ×`);
         }
         
         while(session.inTransaction()) console.log("in Transaction");
         // Contains errors if it fails...
         /* if( ! placesTransaction){
               
         } */
        
      } else {
         console.error(err);
      }
   })
}

module.exports = { Location, initLocation };