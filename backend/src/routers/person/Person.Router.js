const { getRouter } = require("../router");
const { errorHandler } = require("../../middlewares/error");
const { Person } = require("./Person.Model");
const { PersonValidator, updatePersonValidator } = require("./Person.Validator");

const PersonRouter = getRouter();

PersonRouter.route("/")
   .get(async (req, res, next) => {
      const people = await Person.find({}).exec();
      res.json({ data: people });
   }).put(async (req, res, next) => {
      var createdPerson;
      try {
         createdPerson = await Person.create(
            PersonValidator.validateSync(req.body, { abortEarly: false })
         )
      } catch (e) {
         return next(e)
      }
      res.json({ data: createdPerson })
   })


PersonRouter.route("/:id")
   .get(async (req, res, next) => {
      const person = await Person.findById(req.params.id).exec();

      res.json({ data: person });
   }).post(async (req, res, next) => {
      var updatedPerson;
      try {
         updatedPerson = await Person.findByIdAndUpdate(req.params.id, { ...updatePersonValidator.validateSync(req.body) }, { new: true }).exec();
      } catch (e) {
         return next(e)
      }
      res.json({ data: updatedPerson });

   }).delete(async (req, res, next) => {
      var deletedPerson;
      try {
         deletedPerson = await Person.findByIdAndRemove(req.params.id,{new: true}).exec();
      } catch (e) {
         return next(e)
      }
      res.json({ data: deletedPerson })
   })



PersonRouter.use(errorHandler);

module.exports = { PersonRouter };  