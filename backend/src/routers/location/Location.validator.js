const yup = require("yup");

const resourceValidator = yup.string().oneOf(["zona", "provincia", "regione", "cap"]);


module.exports = { resourceValidator };