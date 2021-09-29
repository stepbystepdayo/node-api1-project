// BUILD YOUR SERVER HERE

const express = require("express");
const User = require("./users/model");
const server = express();

server.use(express.json());

//[POST]

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  User.insert(newUser)
    .then((user) => {
      res.json(user);
    })
    .catch(() => {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
      });
    });
});

//[GET]
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

//[GET]
server.get("./api/users/:id", (req, res) => {
  const idVar = req.params.id;
  User.findById(idVar)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    });
});

//[PUT]
server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updateUser = await User.update(id, changes);
    res.status(200).json(updateUser);
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

//[DELETE]
server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.delete(id);
    res.status(201).json(deleteUser);
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
