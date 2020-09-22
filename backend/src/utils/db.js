const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bazar", {
   user: process.env.MONGODB_USERNAME,
   pass: process.env.MONGODB_PASSWORD,
   authSource: "admin",
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
});

const { initLocation } = require("../routers/location/Location.Model");

// Startup Models init
//  initLocation();