const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const { AccountValidator, accountValidator } = require("./Account.Validator");
const { Person } = require("../person/Person.Model");

const AccountSK = mongoose.Schema({
   person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
   username: String,
   password: String,
   is_deleted: Boolean,
}, { timestamps: true });

AccountSK.index({
   username: 1,
}, { unique: true });

AccountSK.index({
   username: 1,
   person: 1,
}, { unique: true });

AccountSK.pre("save",function(next){
   this.password = crypto.createHash("sha256").update(this.password).digest("base64");
   next();
})

const Account = mongoose.model("Account", AccountSK);

const initAccount = async () => {
   await Account.deleteMany({}).exec();

   try {
      var AccountData = [{
         person: (await Person.findOne({}).select('_id').exec())._id,
         username: "admin",
         password: "admin",
      }];

      AccountData = AccountData.map(async account => await Account.create(accountValidator.validateSync(account)));

      console.log(`Account init: ✓`);
   } catch (e) {
      console.log(e);
      console.log(`Account init: ×`);
   }
}

module.exports = { Account, initAccount };