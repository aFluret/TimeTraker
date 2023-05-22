const mongoose = require("mongoose");

// Todo:
// modify the schema 
// 1) to make new array of string in the schema
// 2) can we provide min & max range to the array(team member)...?
const projectSchema = new mongoose.Schema({
  projectname: { type: String, required: true },
  userName: { type: String, required: true },
  description: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  hours: { type: Number, required: true },
  billingAmount: { type: Number, required: true },
  budgetSpent: { type: Number, required: true },
  createdOn: { type: String, default: Date.now , required: true },
  status: { type: Boolean, required: true, default: true },

});

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
