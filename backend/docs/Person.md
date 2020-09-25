# People

- [People](#people)
  - [Modelli DB](#modelli-db)
    - [Person](#person)
    - [User](#user)
      - [Indexes](#indexes)
  - [Routes](#routes)

## Modelli DB 

### Person
> Rappresenta una persona fisica
```js
mongoose.Schema({
   fname: String,
   lname: String,
   bithDay: Date,
   created_at : Date,
   residence_id: { type : mongoose.Schema.Types.ObjectId , ref: "Location" },
   is_deleted: Boolean,
   attributes: [String]
});
```

### User

> Rappresenta un account correlato ad una person fisica

```js
mongoose.Schema({
   person_id : { type : mongoose.Schema.Types.ObjectId , ref: "Person" },
   username: String,
   password: String,
   created_at: Date,
   is_deleted: Boolean,
   residence_id: { type : mongoose.Schema.Types.ObjectId , ref: "Location" },
});
```

#### Indexes

```js
index({
username: 1,
}, { unique: true });

index({
username: 1,
person_id: 1,
}, { unique: true });
```

## Routes

> nuovo express.Router() -> ```getRouter```   
> base route : /registry

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