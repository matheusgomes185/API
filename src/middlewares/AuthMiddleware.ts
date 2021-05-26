import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

function AuthMiddleware(request: Request, response: Response, nextFunction: NextFunction) {
    const { authorization } = request.headers;

    if(!authorization) {
        return response.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, 'secretttttpai');
        const { id } = data as TokenPayload;

        request.userId = id;

        return nextFunction();
    } catch {
        return response.sendStatus(401);
    }
}

export { AuthMiddleware };
