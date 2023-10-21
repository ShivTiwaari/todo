const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

function handleDelete(targetId) {
  let tempTaskArr = data.tasks;
  console.log(tempTaskArr);
  let finalArr = tempTaskArr.filter((i) => i.id != targetId);
  data.tasks = finalArr;
  fs.writeFileSync("./data.json", JSON.stringify(data));
}
function handleCheck(id) {
  let temp = data.tasks;
  console.log(id);
  console.log(temp[0].id);
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].id == id) {
      temp[i].checked = !temp[i].checked;
      console.log("id matched");
    }
  }
  data.tasks = temp;
  fs.writeFileSync("./data.json", JSON.stringify(data));
}

app.get("/", (req, res) => {
  res.json(data);
});

app.delete("/", (req, res) => {
  let targetId = req.query.id;
  if (targetId == "all") {
    data.tasks = [];
    fs.writeFileSync("./data.json", JSON.stringify(data));
  }
  handleDelete(targetId);
  res.json(data);
});

app.put("/", (req, res) => {
  let id = req.query.id;
  handleCheck(id);
});

app.post("/", (req, res) => {
  data.tasks = [...data.tasks, req.body];
  fs.writeFileSync("./data.json", JSON.stringify(data));
  res.json(data);
});

app.listen(5000);
