import express,{Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import {router} from "./routes"; // importando as rotas

const app  = express(); // inicializando o express
app.use(express.json()); // falando para o express que o tipo de dados que vamos usar é o json
app.use(cors());
app.use(router); // falando para aplicação usar as rotas do router

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..','tmp'))
)

app.use((err:Error, req: Request, res: Response, next: NextFunction)=>{
    if (err instanceof Error){ // Se for uma instância do tipo error, lançar uma exeção
       return res.status(400).json({
            error: err.message
       })
    }
    
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(3333, ()=>{  //inciializando  e escolhendo a porta em que vai rodar o servidor e passando uma função de callback
    console.log('Servidor Online!')
})