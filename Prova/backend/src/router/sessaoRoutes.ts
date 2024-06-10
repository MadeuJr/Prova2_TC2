import { Router, Request, Response } from 'express';
import { SessaoController } from '../controllers/sessaoController';

const sessaoRouter = Router();

sessaoRouter.get('/sessao/:id', async (req: Request, res: Response) => {
    return await new SessaoController(req, res).findOneSessao();
});

sessaoRouter.get('/sessao', (req: Request, res: Response) => {
    return new SessaoController(req, res).findAllSessoes();
});

sessaoRouter.post('/sessao/create', (req: Request, res: Response) => {
    return new SessaoController(req, res).createSessao();
});

sessaoRouter.put('/sessao/:id', async (req: Request, res: Response) => {
  return await new SessaoController(req, res).updateSessao();
});
sessaoRouter.delete('/sessao/:id', async (req: Request, res: Response) => {
  return await new SessaoController(req, res).deleteSessao();
});

export default sessaoRouter;
