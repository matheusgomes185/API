import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {

    async create(request: Request, response: Response) {
        const { email, password, name, username } = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if(userAlreadyExists) {
            return response.json({
                error: "User already exists",
            });
        }

        const user = userRepository.create({
            email, password, name, username
        });

        await userRepository.save(user);

        return response.json(user);
    }
    
    async update(request: Request, response: Response) {
        const userData = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const user = userRepository.update(
            request.userId, 
            userData
        );

        return response.json(userData);
    }

    async show(request: Request, response: Response) {
        const userRepository = getCustomRepository(UsersRepository);

        const all = await userRepository.find();

        return response.json(all);
    }

    async profile(request: Request, response: Response) {
        const user = request.userId;
        
        const userRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRepository.findOne({ 
            id: user
         });

        if(!userAlreadyExists) {
            return response.json({
                error: "User not exists",
            });
        }

        return response.json(userAlreadyExists);
    }
}

export { UserController };

