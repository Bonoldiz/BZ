# Items

- [Items](#items)
  - [Item](#item)
  - [Modelli DB](#modelli-db)
    - [Item](#item-1)
    - [Properties](#properties)
  - [Routes](#routes)

## Item 
> Rappresenta un oggetto nel maggazino

## Modelli DB

### Item

```js
mongoose.Scheme({
   name: String,
   price: Number, // abbastanza sicuro per le valute
   description: String,
   location_id: {type: mongoose.Schema.Types.ObjectId,ref: "Location"},
   donor_id: {type: mongoose.Schema.Types.ObjectId,ref: "Person"},
   employee_id: {type: mongoose.Schema.Types.ObjectId,ref: "Person"},
   prop_links: [{type: mongoose.Schema.Types.ObjectId,ref: "PropLink"}]
})
```

### Properties 
> rappresenta le proprietà/caratteristiche dell'oggetto

*PropValue*
```js
mongoose.Scheme({
   name: String
})
```

*PropLink*
```js
mongoose.Scheme({
   strength: String,
   prop_from: {type: mongoose.Schema.Types.ObjectId,ref: "PropValue"},
   prop_to: {type: mongoose.Schema.Types.ObjectId,ref: "PropValue"}
})
```

## Routes 

> nuovo express.Router() -> ```getRouter```
> base route : /item

---

- [ ] ```GET  /```

ritorna tutti gli oggetti

- [ ] ```GET  /person/:id```

ritorna un determinato oggetto

- [ ] ```PUT  /person```

aggiunge una determinata persona

- [ ] ```POST  /person/:id```

aggiorna una persona

- [ ] ```DELETE  /person/:id```

rimuove una persona

---

- [ ] ```GET  /account```

ritorna tutte gli account

- [ ] ```GET  /account/:id```

ritorna un determinato account

- [ ] ```PUT  /account```

aggiunge un account

- [ ] ```POST  /account/:id```

aggiorna un account

- [ ] ```DELETE  /account/:id```

rimuove un account

--- 

> TODO : routes per le props 
