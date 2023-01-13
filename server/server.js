import express, {json} from "express";
import path from "path";
import {Server} from "socket.io";
import cors from "cors";

const app = express()
const port = 5000

app.use(json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})