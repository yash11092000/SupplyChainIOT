require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const cookieparser = require("cookie-parser");

require("./db/conn");
const Register = require("./models/registers");
// const bcrypt = require("bcryptjs/dist/bcrypt");
// const static_path =
// console.log(path.join(__dirname, "../public"))
const static_path = path.join(__dirname, "../public");
console.log(static_path, "hello");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use("/public", express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
app.use(cookieparser());
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/owner", auth, (req, res) => {
  res.render("owner");
});
app.get("/delivery", auth, (req, res) => {
  res.render("delivery");
});
app.get("/buyer", (req, res) => {
  res.render("buyer");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/data", (req, res) => {
  res.render("firebase");
});

app.get("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwt");
    console.log("logout successfully");
    await req.user.save();
    res.render("login");
  } catch (error) {
    res.render("login");
  }
});
app.get("*", (req, res) => {
  res.status(404).render("error");
});

// creating new user on database
app.post("/register", async (req, res) => {
  const IsEntered = await Register.findOne({ email: req.body.email });
  if (IsEntered == null) {
    try {
      
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      if (password === cpassword) {
        const registerOwner = new Register({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          cpassword: req.body.cpassword,
        });

        const token = await registerOwner.generateAuthToken();
        // console.log("token is " + token)

        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 100000),
          httpOnly: true,
        });

        const registered = await registerOwner.save();
        // console.log("token is " + token)
        swal("Nice!", "Registered Successfully!", "success");
        res.status(201).render("index");
      } else {
        swal("Oopd!", "Registeration UnSuccessfully!", "danger");
        res.status(201).render("register");
      }
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    // res.status(400).send("User already Exist");
    res.status(201).render("register");
  }
});

app.post("/login", async (req, res) => {
  try {
    const Enteredemail = req.body.email;
    const Enteredpassword = req.body.password;
    const userEmail = await Register.findOne({ email: Enteredemail });
    const isMatch = await bcrypt.compare(Enteredpassword, userEmail.password);
    const token = await userEmail.generateAuthToken();

    // console.log("token is " + token)

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 650000),
      httpOnly: true,
    });

    if (isMatch) {
      res.status(201).render("index");
    } else {
      swal("OOps!", "Login Unsuccessfull!", "danger");
      res.send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("invalid Credentials");
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port} ~~`);
});
