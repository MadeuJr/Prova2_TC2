import { Router, Request, Response } from 'express';
import { SalaController } from '../controllers/salaController';

const salaRouter = Router();

salaRouter.get('/sala/:id', async (req: Request, res: Response) => {
    return await new SalaController(req, res).findOneSala();
});

salaRouter.get('/sala', async (req: Request, res: Response) => {
    return await new SalaController(req, res).findAllSalas();
});

salaRouter.post('/sala', async (req: Request, res: Response) => {
    return await new SalaController(req, res).createSala();
});

salaRouter.put('/sala', async (req: Request, res: Response) => {
    return await new SalaController(req, res).updateSala();
});
salaRouter.delete('/sala/:id', async (req: Request, res: Response) => {
    return await new SalaController(req, res).deleteSala();
});

export default salaRouter;
