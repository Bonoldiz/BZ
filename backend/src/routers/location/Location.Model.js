const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const GenericSK = mongoose.Schema({
   nome: { type: String },
   codice: { type: String, unique: true }
})

const Zone = mongoose.model("Zone", GenericSK, "zone");
const Province = mongoose.model("Province", GenericSK, "province");
const Region = mongoose.model("Region", GenericSK, "region");


const LocationSK = mongoose.Schema({
   nome: { type: String },
   codice: { type: String, unique: true },
   codice_zona: { type: String },
   codice_regione: { type: String},
   codice_provincia: { type: String},
   sigla: { type: String },
   codiceCatastale: { type: String },
   cap: { type: [String] },
   popolazione: { type: Number },
});

LocationSK.set('toObject', { virtuals: true });
LocationSK.set('toJSON', { virtuals: true });


LocationSK.virtual("regione",{
   ref:"Region",
   localField: "codice_regione",
   foreignField: "codice",
   justOne: true
} )
LocationSK.virtual("provincia",{
   ref:"Province",
   localField: "codice_provincia",
   foreignField: "codice",
   justOne: true
} )
LocationSK.virtual("zona",{
   ref:"Zone",
   localField: "codice_zona",
   foreignField: "codice",
   justOne: true
} )

const Location = mongoose.model("Location", LocationSK, "location");

const initLocation = async () => {
   // Drop the current collection
   Location.remove();
   Region.remove();
   Province.remove();
   Zone.remove();

   // Load data from comuni.json
   const locations = path.join(__dirname, '../../', 'resources/comuni.json');
   fs.readFile(locations, { encoding: 'utf-8' }, async (err, data) => {
      if (!err) {
         const comuniParsed = JSON.parse(data);

         var session = await mongoose.startSession();

         try {
            // Start a mongodb generic places transaction
            session.startTransaction();

            comuniParsed.forEach(async element => {
               await Zone.findOneAndUpdate(element.zona, element.zona, { upsert: true, useFindAndModify: false, session: session });
               await Province.findOneAndUpdate(element.provincia, element.provincia, { upsert: true, useFindAndModify: false, session: session });
               await Region.findOneAndUpdate(element.regione, element.regione, { upsert: true, useFindAndModify: false, session: session });
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
                  codice_regione:element.regione.codice,
                  codice_zona:element.zona.codice,
                  codice_provincia: element.provincia.codice
               });

               await newLocation.save({ session });
            });

            await session.commitTransaction();

            console.log(`Locations init: ✓`);

         } catch (e) {
            console.log(e);

            await session.abortTransaction();
            session.endSession();

            console.log(`Places init: ×`);
         }

         while (session.inTransaction()) console.log("in Transaction");
         // Contains errors if it fails...
         /* if( ! placesTransaction){
               
         } */

      } else {
         console.error(err);
      }
   })
}

module.exports = { Location, Region, Province, Zone, initLocation };