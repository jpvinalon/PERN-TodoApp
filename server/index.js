const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { uuid } = require("uuidv4");
//midlleware
app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: uuidv4(),
    title: "Clean",
    details: "Clean House",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Work",
    details: "Work House",
    completed: false,
  },
  {
    id: uuidv4(),
    title: "Laundry",
    details: "Laundry House",
    completed: true,
  },
];

//ROUTES

//get all task
app.get("/api/v1/tasks", async (req, res) => {
  res.send(tasks);
});

app.get("/api/v1/tasks/:id", async (req, res) => {
  const task = tasks.find((c) => c.id === req.params.id);
  if (!task) res.status(404).send("Task not found!");
  res.send(task);
});

app.post("/api/v1/tasks", async (req, res) => {
  const task = {
    id: uuid(),
    title: req.body.title,
    details: req.body.details,
    completed: false,
  };
  tasks.push(task);
  res.send(task);
});

app.put("/api/v1/tasks/:id", async (req, res) => {
  const task = tasks.find((c) => c.id === req.params.id);
  if (!task) res.status(404).send("Task not found!");

  task.title = req.body.title;
  task.details = req.body.details;

  res.send(task);
});

app.delete("/api/v1/tasks/:id", async (req, res) => {
  const task = tasks.find((c) => c.id === req.params.id);
  if (!task) res.status(404).send("Task not found!");

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  res.send(task);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
