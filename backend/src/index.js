const listEndpoints = require("express-list-endpoints");
const express = require("express");
const helment = require("helmet");
const cors = require("cors");
require("./utils/logger");
require("./utils/db");

const { errorHandler } = require("./middlewares/error");
const { LocationRouter } = require("./routers/location/Location.Router");
const { PersonRouter } = require("./routers/person/Person.Router");
const { getRouter } = require("./routers/router");

/** 
 * LOAD .env FILE
 * access them via process.env
 * **/
require("dotenv").config();

/**
 * main Express app instance  
 */
const app = express();

// MIDDLEWARES 
app.use(cors());
app.use(helment());

app.use('/location', LocationRouter);
app.use('/person', PersonRouter);

app.use(errorHandler);

app.get("*",(req,res) => {
   res.status(404);
   return res.json({errors: ["404","Route not found :/"],routes: listEndpoints(app)})
})

app.listen(process.env.EXPRESS_APP_PORT || 9000, () => {
   console.log(`App is listening at ${process.env.EXPRESS_APP_PORT || 9000}.`);
});