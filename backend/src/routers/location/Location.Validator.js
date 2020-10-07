const yup = require("yup");

const resourceValidator = yup.string().oneOf(["provincia", "regione", "municipalita","indirizzo"]);

const indirizzoValidator = yup.object().shape({
   via: yup.string().required(),
   civico: yup.string(),
   cap: yup.string().required(),
   municipalita: yup.string().required(),
   attributi: yup.array(yup.string())
})

const updateIndirizzoValidator = yup.object().shape({
   via: yup.string(),
   civico: yup.string(),
   attributi: yup.array(yup.string())
})


module.exports = { resourceValidator, indirizzoValidator, updateIndirizzoValidator };