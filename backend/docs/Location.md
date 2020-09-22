# Locations

- [Locations](#locations)
  - [Modelli DB](#modelli-db)
    - [Regione](#regione)
    - [Provincia](#provincia)
    - [Municipalita](#municipalita)
    - [Indirizzo](#indirizzo)
  - [Routes](#routes)

> vedi : [comuni-json](https://github.com/matteocontrini/comuni-json)


schema file ```comuni.json``` : 
```json
{
    "nome": "Terranova dei Passerini",
    "codice": "098057",
    "zona": {
        "nome": "Nord-ovest",
        "codice": "1"
    },
    "regione": {
        "codice": "03",
        "nome": "Lombardia"
    },
    "provincia": {
        "codice": "098",
        "nome": "Lodi"
    },
    "sigla": "LO",
    "codiceCatastale": "L125",
    "cap": ["26827"],
    "popolazione": 906
}
```

## Modelli DB 

### Regione

rappresenta una regione

```js
mongoose.Schema({
   nome: { type: String },
   codice: { type: String, unique: true },
});
```

### Provincia

rappresenta una provincia

```js
mongoose.Schema({
   nome: { type: String },
   codice: { type: String, unique: true },
   regione: { type: String} // codice regione
});
```

### Municipalita

rappresenta un comune/paese

```js
mongoose.Schema({
   nome: { type: String },
   codice: { type: String, unique: true },
   zona: { type: String },
   regione : { type: String}, // codice regione
   provincia: { type: String}, // codice provincia
   sigla: { type: String },
   codiceCatastale: { type: String },
   cap: { type: [String] },
   popolazione: { type: Number },
});
```

### Indirizzo

rappresenta un certo indirizzo 

```js
mongoose.Schema({
   via: { type: String },
   civico: { type: String },
   cap: { type: String },
   regione : { type: String}, // codice regione
   provincia: { type: String}, // codice provincia
   comune : { type: String }, // rappresenta un comune/paese,
   attributi: [String]
});
```

## Routes

> nuovo express.Router() -> ```getRouter``` 
> base route : /location

```GET  /:resource```
    
parametro ```resource```: 
- ```yup.string().oneOf(["municipalita", "provincia", "regione"]);```

ritorna la risorsa richiesta

```GET  /indirizzo/```

ritorna tutti gli indirizzi

```GET  /indirizzo/:id```

ritorna un determinato indirizzo

```PUT  /indirizzo/```

Aggiunge una nuovo indirizzo

```POST  /indirizzo/:id```

Aggiorna un indirizzo

```POST  /indirizzo/:id```

Elimina un indirizzo
