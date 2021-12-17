const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist/healthy-food-web")));
}

//ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/recipes", require("./routes/recipes"));
app.use("/settings", require("./routes/settings"));
app.use("/favorites", require("./routes/favorites"));
app.use("/moderation", require("./routes/moderation"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/healthy-food-web/index.html"));
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
});
