import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
import authRouter from './routes/auth.routes.js'
import fileRouter from './routes/file.routes.js'
import cors from 'cors'
const app = express();
//const WSServer = require('express-ws')(app)


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
// app.use(
//   cors({
//     origin: "http://10.244.10.12:5000",
//   })
// );
app.use(cors())
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

// app.ws('/'), (ws, req) =>{
//   console.log('Подключение установлено')
//   ws.send('Ты подключился')
//   ws.on('message', (msg) =>{
//     console.log(msg)
//   })
// }
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
