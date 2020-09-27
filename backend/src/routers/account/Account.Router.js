const { getRouter } = require("../router");
const { errorHandler } = require("../../middlewares/error");

const AccountRouter = getRouter();

AccountRouter.route("/")
   .get(async (req, res, next) => {
      res.json({ data: [] })
   })
   .put(async (req, res, next) => {
      res.json({ data: [] })
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