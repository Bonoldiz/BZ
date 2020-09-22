const yup = require("yup");

const resourceValidator = yup.string().oneOf(["zone", "province", "region"]);

const locationQueryValidator = yup.object().shape({
   nome: yup.string(),
   codice: yup.string(),
   codice_zona: yup.string(),
   codice_regione: yup.string(),
   codice_provincia: yup.string(),
})

const indirizzoValidator = yup.object().shape({
   via: yup.string().required(),
   civico: yup.string(),
   cap: yup.string(),
   regione : yup.string().required(), 
   provincia: yup.string().required(),
   comune : yup.string().required(),
   attributi: yup.array(yup.string())
})

module.exports = { resourceValidator, locationQueryValidator,indirizzoValidator };