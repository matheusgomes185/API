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
            return response.status(409).json({
                error: "User already exists",
            });
        }

        const user = userRepository.create({
            email, password, name, username
        });

        await userRepository.save(user);

        return response.status(201).json(user);
    }
    
    async update(request: Request, response: Response) {
        const userData = request.body;

        const userRepository = getCustomRepository(UsersRepository);

        const user = userRepository.update(
            request.userId, 
            userData
        );

        return response.status(201).json(userData);
    }

    async show(request: Request, response: Response) {
        const userRepository = getCustomRepository(UsersRepository);

        const all = await userRepository.find();

        return response.status(200).json(all);
    }

    async profile(request: Request, response: Response) {
        const user = request.userId;
        
        const userRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRepository.findOne({ 
            id: user
         });

        if(!userAlreadyExists) {
            return response.status(400).json({
                error: "User not exists",
            });
        }

        return response.status(200).json(userAlreadyExists);
    }
}

export { UserController };

