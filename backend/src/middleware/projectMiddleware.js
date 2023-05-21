const Company = require("../features/users/company.model");

const projectMiddleware = async (req, res, next) => {
  let token = req.headers.token;
  // console.log("token", token)
  let [id, email, password] = token.split(":");
  //   console.log("id", id);

  let company = await Company.findById(id);
  //   console.log("comapny", company);
  if (company.email == email && company.password == password) {
    req.userId = id;
    next();
  } else {
    res.status(404).send("Missing authentications");
  }
};

module.exports = projectMiddleware;
