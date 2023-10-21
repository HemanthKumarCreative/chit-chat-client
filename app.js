const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
require("dotenv").config();

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const chatRouter = require("./routes/chats");
const groupRouter = require("./routes/groups");
const invitationRouter = require("./routes/invitations");
const userRouter = require("./routes/users");

const app = express();
app.use(cors("*"));
app.use(express.json());

// Routes
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/chats", chatRouter);
app.use("/api/groups", groupRouter);
app.use("/api/invitations", invitationRouter);
app.use("/api/users", userRouter);

// Start server
const PORT = process.env.PORT || 5000;
const IP = process.env.DB_IP;

app.listen(PORT, async () => {
  console.log(`Server running on http://${IP}:${PORT}`);
  try {
    await sequelize.sync(); // Sync the models with the database
  } catch (err) {
    console.log(err);
  }
});