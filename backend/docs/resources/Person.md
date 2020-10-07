# People

- [People](#people)
  - [Modelli DB](#modelli-db)
    - [Person](#person)
      - [Indexes](#indexes)
  - [Routes](#routes)

## Modelli DB 

### Person
> Rappresenta una persona fisica
```js
mongoose.Schema({
   fname: String,
   lname: String,
   birthDay: Date,
   cf: String,
   created_at : Date,
   indirizzo_id: { type : mongoose.Schema.Types.ObjectId , ref: "Indirizzo" },
   is_deleted: Boolean,
   attributes: [String]
});
```



#### Indexes

```js
index({
   cf:1
},{unique: true});
```

## Routes

> nuovo express.Router() -> ```getRouter```  
> base route : /person

---

- [ ] ```GET  /person```

ritorna tutte le persone

- [ ] ```GET  /person/:id```

ritorna una determinata persona

- [ ] ```PUT  /person```

aggiunge una determinata persona

- [ ] ```POST  /person/:id```

aggiorna una persona

- [ ] ```DELETE  /person/:id```

rimuove una persona
