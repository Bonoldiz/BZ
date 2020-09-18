const express = require("express");
const helment = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");


/**
 * Create and configure an express router instance
 */
const getRouter = () => {
   const router = express.Router();
   router.use(cors());
   router.use(helment());
   router.use(bodyParser.json());

   return router
}

module.exports = { getRouter }