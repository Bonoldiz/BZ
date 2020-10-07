const yup = require("yup");


const PersonValidator = yup.object().shape({
   fname: yup.string().required(),
   lname: yup.string().required(),
   birthDay: yup.date().required().transform((val,orig) => new Date(val)),
   cf: yup.string().required(),
   created_at:  yup.date().required().default(new Date()),
   indirizzo_id: yup.string().required(),
   is_deleted: yup.bool().required().default(false),
   attributes: yup.array().of(yup.string())
})

const updatePersonValidator = yup.object().shape({
   fname: yup.string(),
   lname: yup.string(),
   birthDay: yup.date().transform((val,orig) => new Date(val)),
   cf: yup.string(),
   indirizzo_id: yup.string(),
   is_deleted: yup.bool(),
   attributes: yup.array().of(yup.string())
})

module.exports = { PersonValidator,updatePersonValidator };