const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors");
const mongoose = require("mongoose");
const recipes = require("./routes/recipes");
const user = require("./routes/users");


const session = require('express-session');
dotenv.config();
app.use(express.json());


dotenv.config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", user);
app.use("/api/recipes", recipes);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));


mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));



app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
}));


const PORT = 8000;
app.get("/", (req, res) => {
  res.send("Hello from server!");
});
app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
