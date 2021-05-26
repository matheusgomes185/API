import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {

    async authenticate(request: Request, response: Response) {
        const { email, password } = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOne({
            email: email
        });

        if(!user) {
            return response.status(401).json({
                error: "E-mail or password invalid!"
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return response.status(401).json({
                error: "E-mail or password invalid!"
            });
        }

        const token = jwt.sign(
            { id: user.id },
            'secretttttpai',
            { expiresIn: '1d' }
        );

        delete user.password;

        return response.status(200).json({
            user, token
        });
    }
}

export { AuthController };

