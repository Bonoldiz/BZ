# Locations

- [Locations](#locations)
  - [Modelli DB](#modelli-db)
    - [Regione](#regione)
    - [Provincia](#provincia)
    - [Municipalita](#municipalita)
    - [Indirizzo](#indirizzo)
      - [Indexes](#indexes)
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
   nome: String,
   codice: { type: String, unique: true },
});
```

### Provincia

rappresenta una provincia

```js
mongoose.Schema({
   nome: String,
   codice: { type: String, unique: true },
   regione: String // codice regione
});
```

### Municipalita

rappresenta un comune/paese

```js
mongoose.Schema({
   nome: String,
   codice: { type: String, unique: true },
   zona: String,
   regione : String, // codice regione
   provincia: String, // codice provincia
   sigla: String,
   codiceCatastale: String,
   cap: { type: [String] },
   popolazione: { type: Number },
});
```

### Indirizzo

rappresenta un certo indirizzo 

```js
mongoose.Schema({
   via: String,
   civico: String,
   cap: String,
   regione : String, // codice regione
   provincia: String, // codice provincia
   municipalita : String, // rappresenta un comune/paese
   is_deleted: Boolean,
   attributes: [String]
});
```

#### Indexes

- Tutti i campi ```codice``` sono **unique**
- ```Indirizzo``` : 
 ```js
 index({
   via: 1,
   civico: 1,
   municipalita: 1,
   regione: 1,
   provincia: 1,
}, { unique: true });
```

## Routes

> nuovo express.Router() -> ```getRouter```   
> base route : /location

---

- [x] ```GET  /:resource```
    
parametro ```resource```: 
- ```yup.string().oneOf(["municipalita", "provincia", "regione"]);```

ritorna le risorse richieste

- [x] ```GET  /:resource/:id```

ritorna una determinata risorsa

---

- [x] ```GET  /indirizzo/```

ritorna tutti gli indirizzi

- [x] ```GET  /indirizzo/:id```

ritorna un determinato indirizzo

- [x] ```PUT  /indirizzo/```

Aggiunge una nuovo indirizzo

- [X] ```POST  /indirizzo/:id```

Aggiorna un indirizzo

- [x] ```DELETE  /indirizzo/:id```

Elimina un indirizzo
