const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true ,  },
  job:{type:String ,required:true },
  isUser:{type:Boolean ,required:false },
  mobileNumber:{type:Number}
});

const Company = mongoose.model("users", userSchema);
module.exports = Company;
