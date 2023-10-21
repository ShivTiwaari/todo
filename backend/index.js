const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());
app.use(express.json());

//////////////  GLOBAL VARIABLES   /////////////////////////////////////////////////////////////////////////////////

const secret = "ugewfy4734gf4";

//////////////  MIDDLEWARES    ////////////////////////////////////////////////////////////////////////////////////

const authenticate = (req, res, next) => {
  let token = req.headers.token;
  if (token) {
    if (jwt.verify(token?.split(" ")[1], secret)) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "unauthorised access, login to continue" });
    }
  } else {
    res.json({ message: "no jwt detected" });
  }
};

//////////////  FUNCTIONS   ////////////////////////////////////////////////////////////////////////////////////////

async function handleDelete(id, username) {
  let dbResponse = await Collection.find({ username }, { tasks: true });
  let taskArr = dbResponse[0].tasks;
  let newArr = taskArr.filter((i) => i.id != id);
  await Collection.updateMany({ username }, { $set: { tasks: newArr } });
}

async function handleCheck(id, username) {
  let dbResponse = await Collection.find({ username });
  let taskArr = dbResponse[0].tasks;
  for (let i = 0; i < taskArr.length; i++) {
    if (taskArr[i].id == id) {
      taskArr[i].checked = !taskArr[i].checked;
    }
  }
  await Collection.updateMany({ username }, { $set: { tasks: taskArr } });
}

//////////////  MONGOOSE   ////////////////////////////////////////////////////////////////////////////////////////

mongoose.connect(
  "mongodb+srv://--------------------------database-url--------------------------"
);

const collectionSchema = new mongoose.Schema({
  username: String,
  password: String,
  tasks: [
    {
      task: String,
      id: String,
      checked: Boolean,
    },
  ],
});

let Collection = mongoose.model("Collection", collectionSchema);

///////////////   ROUTES   ////////////////////////////////////////////////////////////////////////////////////////

//////////   LOAD ALL TASKS    ///////////////////////////////////////////////////////

app.get("/", authenticate, async (req, res) => {
  let token = req.headers.token;
  let { username } = jwt.verify(token.split(" ")[1], secret);
  let data = await Collection.find({ username }, { tasks: true });
  res.json(data[0].tasks);
});

//////////    SIGN UP    /////////////////////////////////////////////////////////////////

app.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  console.log(`username: ${username}`);
  console.log(`password: ${password}`);
  let allUsers = await Collection.find({});
  console.log(`allUsers: ${allUsers}`);
  let user = allUsers.find((i) => i.username == username);
  if (!user) {
    console.log("signin approved");
    let newObj = new Collection({
      username: username,
      password: password,
      tasks: [],
    });
    await newObj.save();
    let token = jwt.sign({ username, password }, secret);
    res.json({ message: "signed in", token });
  } else {
    console.log("signin averted");
    res.json({ message: "User already exists, try logging in." });
  }
});

//////////    LOGIN    ///////////////////////////////////////////////////////////////////

app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let allUsers = await Collection.find({});
  let user = allUsers.find(
    (i) => i.username == username && i.password == password
  );
  if (user) {
    let token = jwt.sign(req.body, secret);
    res.json({ message: "logged in", token });
  } else {
    res
      .status(403)
      .json({ message: "wrong user credentials, try again or sign up" });
  }
});

//////////    ADD A NEW TASK    ////////////////////////////////////////////////////////////////

app.post("/", authenticate, async (req, res) => {
  let token = req.headers.token;
  let { username } = jwt.verify(token.split(" ")[1], secret);
  let newTask = req.body;
  let prevTaskArray = await Collection.find({ username }, { tasks: true });
  prevTaskArray[0].tasks.push(newTask);
  await Collection.updateMany(
    { username },
    { $set: { tasks: prevTaskArray[0].tasks } }
  );
  res.json(prevTaskArray);
});

//////////    HANDLE CHECKING/COMPLETING OF A TASK     /////////////////////////////////////////

app.put("/:id", authenticate, (req, res) => {
  let token = req.headers.token;
  let { username } = jwt.verify(token.split(" ")[1], secret);
  let id = req.params.id;
  handleCheck(id, username);
  res.json({ message: "checked" });
});

//////////    DELETE A TASK     ////////////////////////////////////////////////////////////////

app.delete("/:id", authenticate, async (req, res) => {
  let token = req.headers.token;
  let { username } = jwt.verify(token.split(" ")[1], secret);
  let id = req.params.id;
  if (id == "all") {
    await Collection.updateMany({ username }, { $set: { tasks: [] } });
    res.json([]);
  }
  handleDelete(id, username);
  // res.json({ message: "deleted" });
});

/////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(5000, () => {
  console.log("listening on 5000");
});
