const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { PersonValidator } = require("./Person.Validator");

const PersonSK = mongoose.Schema({
   fname: String,
   lname: String,
   birthDay: Date,
   cf: String,
   created_at: Date,
   indirizzo_id: { type: mongoose.Schema.Types.ObjectId, ref: "Indirizzo" },
   is_deleted: Boolean,
   attributes: [String]
})

PersonSK.index({
   cf: 1
}, { unique: true })

const Person = mongoose.model("Person", PersonSK);

const initPerson = async () => {
   await Person.deleteMany({}).exec();

   try {
      var personData = JSON.parse(fs.readFileSync(path.join(__dirname, "../../", "resources", "person.json"), { encoding: "utf-8" }));
      personData = personData.map(person => PersonValidator.validateSync(person));
      
      await Person.insertMany(personData);

      console.log(`Person init: ✓`);
   } catch (e) {
      console.log(e);
      console.log(`Person init: ×`);
   }
}

module.exports = { Person, initPerson };