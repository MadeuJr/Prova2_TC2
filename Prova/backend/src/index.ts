import express from "express";
import SalaRouter from "./router/salaRoutes"
import { environment } from "./environment";
import { log } from "console";

const app = express();
const port = 2981;

app.use(express.json())

app.use(SalaRouter);

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: "bearer " + environment.API_TOKEN,
    },
};




app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Access: http://localhost:${port}`))
