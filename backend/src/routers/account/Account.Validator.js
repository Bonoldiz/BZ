const yup = require("yup");


const accountValidator = yup.object().shape({
   person: yup.string().required(),
   username: yup.string().min(4).max(16).required(),
   password: yup.string().min(4).max(16).required(),
   is_deleted: yup.bool().default(false).required()
})

const updateAccountValidator = yup.object().shape({
   person: yup.string(),
   username: yup.string().min(4).max(16),
   password: yup.string().min(4).max(16),
   is_deleted: yup.bool().default(false).required()
})

module.exports = { accountValidator, updateAccountValidator };