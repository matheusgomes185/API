import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ChallengesRepository } from '../repositories/ChallengesRepository';

class ChallengeController {
    async create(request: Request, response: Response) {
        const { type, description, amount } = request.body;

        const challengeRepository = getCustomRepository(ChallengesRepository);

        const challenge = challengeRepository.create({
            type, description, amount
        });

        await challengeRepository.save(challenge);

        return response.json(challenge);
    }

    async show(request: Request, response: Response) {
        const challengeRepository = getCustomRepository(ChallengesRepository);

        const all = await challengeRepository.find();

        return response.json(all);
    }
}

export { ChallengeController };

