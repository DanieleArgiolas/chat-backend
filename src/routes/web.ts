import { Request, Response } from 'express';
import { Router } from 'express';
import { MainController } from '../controllers/main.controller';

const router = Router();

router.get('/', (req: Request, res: Response) =>  MainController.show(req, res) );

router.get('/test', (req: Request, res: Response) =>  MainController.test(req, res) );

export { router as webRouter };