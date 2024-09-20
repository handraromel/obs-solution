const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 30002;
const USERS_FILE = path.join(__dirname, "public", "users.json");

app.use(cors());
app.use(bodyParser.json());

const readUsers = async (req, res, next) => {
  try {
    await fs.access(USERS_FILE);

    const data = await fs.readFile(USERS_FILE, "utf8");
    req.users = JSON.parse(data);
    next();
  } catch (error) {
    if (error.code === "ENOENT") {
      req.users = [];
      await writeUsers(req.users);
      next();
    } else {
      console.error("Error reading users file:", error);
      res
        .status(500)
        .json({ error: "Error reading users file", details: error.message });
    }
  }
};

const writeUsers = async (users) => {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
    throw error;
  }
};

app.get("/api/users", readUsers, (req, res) => {
  res.json(req.users);
});

app.post("/api/users", readUsers, async (req, res) => {
  try {
    const newUser = req.body;
    newUser.id = Date.now(); // Simple way to generate unique id
    req.users.push(newUser);
    await writeUsers(req.users);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding new user:", error);
    res
      .status(500)
      .json({ error: "Error adding new user", details: error.message });
  }
});

app.put("/api/users/:id", readUsers, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    const index = req.users.findIndex((user) => user.id === userId);

    if (index !== -1) {
      req.users[index] = { ...req.users[index], ...updatedUser };
      await writeUsers(req.users);
      res.json(req.users[index]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ error: "Error updating user", details: error.message });
  }
});

app.delete("/api/users/:id", readUsers, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const index = req.users.findIndex((user) => user.id === userId);

    if (index !== -1) {
      req.users.splice(index, 1);
      await writeUsers(req.users);
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ error: "Error deleting user", details: error.message });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Users file location: ${USERS_FILE}`);
});
