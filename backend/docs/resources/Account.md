
# Account 

- [Account](#account)
  - [Modelli DB](#modelli-db)
    - [Account](#account-1)
      - [Indexes](#indexes)
  - [Routes](#routes)

## Modelli DB 

### Account

> Rappresenta un account correlato ad una persona fisica

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
> base route : /account

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