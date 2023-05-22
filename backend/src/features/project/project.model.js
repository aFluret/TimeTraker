const mongoose = require("mongoose");

// Todo:
// modify the schema 
// 1) to make new array of string in the schema
// 2) can we provide min & max range to the array(team member)...?
const projectSchema = new mongoose.Schema({
  projectname: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  hours: { type: Array, required: true },
  createdOn: { type: String, default: Date.now , required: true },
  status: { type: String, required: true, default: true },
  closeDate: { type: String, required: true, default: 0 },
});

const Project = mongoose.model("project", projectSchema);
module.exports = Project;
