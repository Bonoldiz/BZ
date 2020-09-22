const yup = require("yup");

const resourceValidator = yup.string().oneOf(["zone", "province", "region"]);

const locationQueryValidator = yup.object().shape({
   nome: yup.string(),
   codice: yup.string(),
   codice_zona: yup.string(),
   codice_regione: yup.string(),
   codice_provincia: yup.string(),
})

module.exports = { resourceValidator, locationQueryValidator };