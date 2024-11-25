const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint for serving the app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint for Telegram user data
app.post("/telegram-user", (req, res) => {
  const user = req.body;

  if (!user || !user.id) {
    return res.status(400).json({ error: "Invalid Telegram user data" });
  }

  res.json({
    message: "User data received successfully",
    user,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
