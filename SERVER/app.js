import express from 'express'
import { config } from './config.js'
import cors from "cors";
import morgan from "morgan";
import { connectDB } from './db/database.js';
import BaNaR from './router/banapress.js'
import { initSocket } from "./connection/socket.js";

const app = express()

app.use(express.json());
app.use(morgan("dev"));
app.use(cors()); 

app.use('/', BaNaR)
app.use((req, res, next) => {
    res.sendStatus(404);
});

connectDB().then(() => {
    const server = app.listen(config.host.port);
    initSocket(server);
}).catch(console.error);