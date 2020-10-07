const { getRouter } = require("../router");
const { errorHandler } = require("../../middlewares/error");
const { Account } = require("./Account.Model");
const { AccountValidator } = require("./Account.Validator");

const AccountRouter = getRouter();

AccountRouter.route("/")
   .get(async (req, res, next) => {
      const accounts = await Account.find({}).populate({
         path: "person"
      }).exec();
      res.json({ data: accounts });
   })
   .put(async (req, res, next) => {
      var account;
      try {
         account = await Account.create(
            AccountValidator.validateSync(req.body, { abortEarly: false })
         )
      } catch (e) {
         return next(e)
      }
      res.json({ data: account })
   })

AccountRouter
   .route("/:id")
   .get(async (req, res, next) => {
      res.json({ data: [] })
   })
   .post(async (req, res, next) => {
      res.json({ data: [] })
   })
   .delete(async (req, res, next) => {
      res.json({ data: [] })
   })

AccountRouter.use(errorHandler);

module.exports = { AccountRouter };  