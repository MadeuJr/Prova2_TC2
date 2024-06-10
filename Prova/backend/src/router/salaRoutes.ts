import { Router, Request, Response } from 'express';
import { SalaController } from '../controllers/salaController';

const salaRouter = Router();

salaRouter.get('/sessao/:id', async (req: Request, res: Response) => {
    return await new SalaController(req, res).findOneSala();
});

salaRouter.get('/sessao', async (req: Request, res: Response) => {
    return await new SalaController(req, res).findAllSalas();
});

salaRouter.post('/sessao', async (req: Request, res: Response) => {
    return await new SalaController(req, res).createSala();
});

salaRouter.put('/sessao', async (req: Request, res: Response) => {
    return await new SalaController(req, res).updateSala();
});
salaRouter.delete('/sessao/:id', async (req: Request, res: Response) => {
    return await new SalaController(req, res).deleteSala();
});

export default salaRouter;
