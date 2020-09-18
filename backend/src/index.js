const express = require("express");
const helment = require("helmet");
const cors = require("cors");
require("./utils/logger");
require("./utils/db");

const { errorHandler } = require("./middlewares/error");
const { LocationRouter } = require("./routers/location/Location.Router");
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

app.get('/', (req, res, next) => {
   console.log("asdas");
   res.json({ data: { message: "hello" } })
});

app.use('/location', LocationRouter, errorHandler);

app.use(errorHandler);

app.listen(process.env.EXPRESS_APP_PORT || 9000, () => {
   console.log(`App is listening at ${process.env.EXPRESS_APP_PORT || 9000}.`);
});