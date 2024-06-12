import express from "express";
import SalaRouter from "./router/salaRoutes"
import SessaoRouter from './router/sessaoRoutes';
import VendaRouter from "./router/vendaRoutes";
import cors from 'cors'

const app = express();
const port = 2981;


app.use(express.json())
app.use(cors())

app.use(SalaRouter, SessaoRouter, VendaRouter);


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Access: http://localhost:${port}`))
