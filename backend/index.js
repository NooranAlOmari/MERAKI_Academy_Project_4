const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

// Import Routers
const articlesRouter = require("./routes/articles");
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");

app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/articles", articlesRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
