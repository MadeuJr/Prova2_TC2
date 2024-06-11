import { Router, Request, Response } from 'express';
import { VendaController } from '../controllers/vendaController';

const vendaRouter = Router();

vendaRouter.get('/venda/:id', async (req: Request, res: Response) => {
    return await new VendaController(req, res).findOneVenda();
});

vendaRouter.get('/venda', (req: Request, res: Response) => {
    return new VendaController(req, res).findAllVendas();
});

vendaRouter.post('/venda', (req: Request, res: Response) => {
    return new VendaController(req, res).createVenda();
});


export default vendaRouter;
