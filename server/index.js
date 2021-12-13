import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import sequelize from './db.js'
import fileUpload from 'express-fileupload'
const app = express();
import routes from './routes/index.js'
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
app.use(fileUpload({}))
app.use(cors())
app.use(express.json());
app.use('/api', routes)

// app.use("/api/auth", authRouter);
// app.use("/api/files", fileRouter);

// app.ws('/'), (ws, req) =>{
//   console.log('Подключение установлено')
//   ws.send('Ты подключился')
//   ws.on('message', (msg) =>{
//     console.log(msg)
//   })
// }
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(process.env.PORT, () => {
            console.log("server started", process.env.PORT);
        });
    } catch (e) {
        start();
    }
};
start();
