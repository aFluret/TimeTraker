const express = require("express");
const Company = require("./company.model");
const app = express.Router();


// <-----Getting all the companies------>
app.get('/' , async  (req , res) => {
  try {
    let c = await Company.find( {} , {});
    // console.log('u:', u)
    res.send(c)
    
  } catch (error) {
    console.log('error:', error)
    res.status(500).send(error.message)
  }
})


// <-----Signin POST for the companies------>
app.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  try {
    let company = await Company.findOne({ email, password });

    if (!company) {
      return res.status(401).send("Authentication failed");
    }

    res.send({
      token: `${company.id}:${company.email}:${company.password}`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// <-----Signup POST for the companies------>
app.post("/signup", async (req, res) => {
  let { email } = req.body;
  try {
    let company = await Company.findOne({ email });
    if (company) {
      return res
        .status(404)
        .send(
          "Cannot create a company with existing email address, trying logging in using this email address"
        );
    }
    let createdCompany = await Company.create(req.body);
    res.send({
      token: `${createdCompany.id}:${createdCompany.email}:${createdCompany.password}`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// <-----PATCH for the company----->

app.patch('/profile/:id' ,async (req , res) => {
  id = req.params.id;
  let uD = req.body;

  try {
    let uC = await Company.findByIdAndUpdate( id  ,uD,{new:true})
    console.log(uC)
    res.send( uC)
  } catch (error) {
    res.status(404).send(error.message)
  }
})


app.delete("/profile/:id", async (req, res) => {
  let { id } = req.params;
  await Company.findOneAndRemove({ _id: id })
    .then((user) => {
      if (!user) {
        res.status(400).send(id + " was not found");
      } else {
        res.status(200).send(id + " was deleted.");
      }
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

module.exports = app;
