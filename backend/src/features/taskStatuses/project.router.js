const express = require("express");
const Project = require("./project.model");
const app = express.Router();
const projectMiddleware = require("../../middleware/projectMiddleware");


app.use(projectMiddleware);
//{ <--Getting  all the projects-->}
app.get("/", async (req, res) => {
  const { status, orderBy = "status", order = "asc", q } = req.query;
  // console.log("status:", req.query);
  let proj;
  if (status && status === "active") {
    try {
      proj = await Project.find({
        $and: [{ userId: req.userId }, { status: true }],
      }).populate("userId");
      // res.send(proj);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else if (status && status === "archived") {
    try {
      proj = await Project.find({
        $and: [{ userId: req.userId }, { status: false }],
      }).populate("userId");
      // res.send(proj);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else if (q) {
    const { q } = req.query;
    let userId = req.userId;
    try {
      let items = await Project.find({
        $and: [
          { userId: req.userId },
          {
            $or: [
              { projectname: { $regex: q } },
              { userName: { $regex: q } },
            ],
          },
        ],
      }).populate("userId");
      res.send(items);
    } catch (e) {
      // console.log(e.message);
      res.status(500).send(e);
    }
  } else {
    try {
      proj = await Project.find({ userId: req.userId })
        .populate("userId")
        .sort({
          [orderBy]: order == "asc" ? 1 : -1,
        });
      // console.log("proj:", proj);
      // res.send(proj);
    } catch (error) {
      console.log("error:", error);
      res.status(500).send(error.message);
    }
  }
  res.send(proj);
});

//Get api for a particulat proj ID
app.get("/:id", async (req, res) => {
  let { id } = req.params;

  await Project.findById(id)
    .populate("userId")
    .then((user) => {
      if (!user) {
        res.status(404).send(id + " was not found");
      } else {
        res.status(200).send(user);
      }
    })

    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//{<-- Firing post req to create a new Proje-->}
app.post("/new", async (req, res) => {
  let userId = req.userId;
  let { projectname, userName } = req.body;
  try {
    let proj = await Project.findOne({ projectname, userName });

    if (proj) {
      return res.status(404).send("This Project already existing");
    }

    let newProject = await Project.create({
      ...req.body,
      userId: userId,
    });

    return res.send(newProject);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//{<--Firing Delete req for an projectid-->}
app.delete("/:id", async (req, res) => {
  let { id } = req.params;

  await Project.findOneAndRemove({ id: id })
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

//{<-- Firing Patch req for projectID -->}
app.patch("/:id", async (req, res) => {
  let { id } = req.params;
  console.log("id:", id);
  let updatedData = req.body;

  try {
    let updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.send(updatedProject);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = app;
