import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string; // id

}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){

    // Receber um token

    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end()
    }

    const [, token] = authToken.split(" ")
    
    try{
        // validar o token
        const{sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload; // estou afirmando uqe a desconstruçao do sub vai ser do tipo Payload apra o typescript
        
        // Recuperar o id do token e colocar dentro de uma variavel user_id dentro do request(req)
        req.user_id = sub
        return next();

    }catch(err){
        return res.status(401).end();
    }

}
