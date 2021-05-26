import { EntityRepository, Repository } from "typeorm";
import { Challenge } from "../models/Challenge";

@EntityRepository(Challenge)
class ChallengesRepository extends Repository<Challenge> {}

export { ChallengesRepository };

