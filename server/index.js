const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/auth.routes");

const app = express();

// const mongoConnect = (cb) => {
//   MongoClient.connect('mongodb://127.0.0.1:27017/cloud')
//     .then((client) => {
//       _db = client.db();
//       cb()
//       console.log('Connected to MongoDb');
//     }).catch((err) => {
//       console.log(err);
//     });
// }
app.use(express.json());
app.use("/api/auth", authRouter);
const start = async () => {
  //console.log(typeof process.env.DB_URL)
  try {
    mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("connected");
      });
    app.listen(process.env.PORT, () => {
      console.log("server started", process.env.PORT);
    });
  } catch (e) {
    start();
  }
};
start();
