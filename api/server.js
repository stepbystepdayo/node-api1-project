// BUILD YOUR SERVER HERE

const express = require("express");
const User = require("./users/model");
const server = express();

server.use(express.json());

//[POST]

server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    User.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

//[GET]
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch(() => {
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
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The user with the specified ID does not exist" });
    });
});

//[DELETE]
server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.remove(id);

    if (!deleteUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.status(201).json(deleteUser);
    }
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

//[PUT]
server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    if (!id) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const updateUser = await User.update(id, changes);
      res.status(200).json(updateUser);
    }
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
