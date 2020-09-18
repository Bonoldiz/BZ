const { getRouter } = require("../router");
const { Location } = require("./Location.Model");
const { resourceValidator } = require("./Location.validator");
const LocationRouter = getRouter()

LocationRouter.get('/', async (req, res, next) => {
   const locations = await Location.find({});

   res.json(locations);
})

LocationRouter.get('/:resource', async (req, res, next) => {
   var resource;
   try {
      resource = await resourceValidator.validate(req.params.resource);
   } catch (e) {
      return next(e);
   }

   const locations = await Location.find({});

   console.log(req.params.resource)

   var resources = locations.reduce((allResources,currentResource) => !allResources.includes(currentResource[resource]) ? [ ...allResources, currentResource[resource] ] : allResources, []);

   res.json(resources);
})


module.exports = { LocationRouter };