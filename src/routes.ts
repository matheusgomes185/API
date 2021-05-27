import { Router } from 'express';
import { Request, Response } from 'express';
import { AuthMiddleware } from './middlewares/AuthMiddleware';
import { AuthController } from './controllers/AuthController';
import { ChallengeController } from './controllers/ChallengeController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController;
const challengeController = new ChallengeController;
const authController = new AuthController;

router.post("/", (req:Request, res:Response) => {
    res.send(200).json({ message: "API is running" });
});
router.post("/auth", authController.authenticate);
router.post("/users", userController.create);
router.put("/users", AuthMiddleware, userController.update);
router.get("/users", AuthMiddleware, userController.show);
router.get("/profile", AuthMiddleware, userController.profile);
router.get("/challenges", AuthMiddleware, challengeController.show);
router.post("/challenges", AuthMiddleware, challengeController.create);

export { router };
