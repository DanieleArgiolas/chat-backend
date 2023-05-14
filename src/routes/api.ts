import { Request, Response } from 'express';
import { Router } from 'express';
import { LoginController } from '../controllers/login.controller';

const router = Router();

router.post('/login', (req: Request, res: Response) =>  LoginController.login(req, res) );

router.get('/test', (req: Request, res: Response) =>  LoginController.test(req, res) );

export { router as apiRouter };