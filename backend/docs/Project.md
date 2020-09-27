# Bazar Backend

- [Bazar Backend](#bazar-backend)
  - [Routers](#routers)
    - [*.Model.js](#modeljs)
    - [*.Router.js](#routerjs)
    - [*.Validator.js](#validatorjs)

entry : /src/index.js

## Routers

L'applicazione si compone nel seguente modo:
- creazione app(express) ```index.js``` 
  - configurazione **env**

> Per ogni risorsa viene creata una directory con lo stesso nome (eg. Person)

### *.Model.js

Modelli per l'accesso al DB (Mongoose)

*Esempio Model*

```js
const mongoose = require("mongoose");

const MyModelSK = mongoose.Schema({

})

const MyModel = mongoose.model("MyModel", MyModelSK);

const initMyModel = () => {

}

module.exports = { MyModel, initMyModel };
```

### *.Router.js

Router Express per l'accesso alla risorsa

*Esempio Router*

```js 
const { getRouter } = require("../router");
const { errorHandler } = require("../../middlewares/error");

const ExampleRouter = getRouter();

ExampleRouter
   .route("/")
   .get(async (req, res, next) => {
      res.json({ data: [] })
   })
   .put(async (req, res, next) => {
      res.json({ data: [] })
   })

ExampleRouter
   .route("/:id")
   .get(async (req, res, next) => {
      res.json({ data: [] })
   })
   .post(async (req, res, next) => {
      res.json({ data: [] })
   })
   .delete(async(req, res, next) => {
      res.json({ data: [] })
   })

ExampleRouter.use(errorHandler);

module.exports = { ExampleRouter };  
```

### *.Validator.js

Validators di **yup** per la risorsa