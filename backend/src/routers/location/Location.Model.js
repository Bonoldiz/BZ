const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const RegioneSK = mongoose.Schema({
   nome: String,
   codice: { type: String, unique: true }
});

const Regione = mongoose.model("Regione", RegioneSK, "regione");


const ProvinciaSK = mongoose.Schema({
   nome: String,
   codice: { type: String, unique: true },
   regione: String
});

const Provincia = mongoose.model("Provincia", ProvinciaSK, "provincia");

const MunicipalitaSK = mongoose.Schema({
   nome: String,
   codice: { type: String, unique: true },
   zona: String,
   regione: String,
   provincia: String,
   sigla: String,
   codiceCatastale: String,
   cap: [String],
   search: String,
   popolazione: Number
});

const Municipalita = mongoose.model("Municipalita", MunicipalitaSK, "municipalita");


const IndirizzoSK = mongoose.Schema({
   via: String,
   civico: String,
   municipalita: { type: mongoose.Schema.Types.ObjectId, ref: "Municipalita" },
   regione: { type: mongoose.Schema.Types.ObjectId, ref: "Regione" },
   provincia: { type: mongoose.Schema.Types.ObjectId, ref: "Provincia" },
   cap: String,
   attributi: [String]
});

IndirizzoSK.index({
   via: 1,
   civico: 1,
   municipalita: 1,
   regione: 1,
   provincia: 1,
}, { unique: true });

const Indirizzo = mongoose.model("Indirizzo", IndirizzoSK, "indirizzo");

const initLocation = async () => {
   // Svuota le collection correnti
   await Municipalita.deleteMany({}).exec();
   await Provincia.deleteMany({}).exec();
   await Regione.deleteMany({}).exec();

   // comuni.json
   const municipalita = path.join(__dirname, '../../', 'resources/comuni.json');
   fs.readFile(municipalita, { encoding: 'utf-8' }, async (err, data) => {
      if (!err) {
         const comuni = JSON.parse(data);

         var regioni = []
         var provincie = []

         comuni.forEach(async element => {
            regioni.push(element.regione);
            provincie.push({ regione: element.regione.codice, ...element.provincia });
         });

         // Riduce regioni e provincie per renderle uniche :)

         regioni = regioni.reduce((regioniUnique, regione) => {
            for (const reg of regioniUnique) {
               if (reg.codice === regione.codice)
                  return regioniUnique
            }
            return [...regioniUnique, regione]
         }, []);

         provincie = provincie.reduce((provincieUnique, provincia) => {
            for (const prov of provincieUnique) {
               if (prov.codice === provincia.codice)
                  return provincieUnique
            }
            return [...provincieUnique, provincia]
         }, []);

         try {

            await Regione.insertMany(regioni).catch(e => console.log(e));
            await Provincia.insertMany(provincie).catch(e => console.log(e));

            console.log(`Regioni & Provincie init: ✓`);

            comuni.forEach(async element => {
               await Municipalita.create(
                  [{
                     nome: element.nome,
                     codice: element.codice,
                     sigla: element.sigla,
                     codiceCatastale: element.codiceCatastale,
                     cap: element.cap,
                     popolazione: element.popolazione,
                     regione: element.regione.codice,
                     zona: element.zona.codice,
                     provincia: element.provincia.codice,
                     search: `${element.nome}, ${element.provincia.nome}, ${element.regione.nome}`
                  }]).catch(e => console.log(e));
            });

            console.log(`Municipalità init: ✓`);
         } catch (e) {
            await session.abortTransaction();
            session.endSession();

            console.log(`Locations init: ×`);
         }
      } else {
         console.error(err);
      }
   })
}

module.exports = { Municipalita, Regione, Provincia, Indirizzo, initLocation };