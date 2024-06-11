import { Sessao, Venda } from "@prisma/client";
import prismaClient from "../repository/prisma";
import { Response, Request } from 'express';


export class VendaController {
    private _req: Request;
    private _res: Response;

    constructor(req: Request, res: Response) {
        this._req = req;
        this._res = res;
    }

    async getNextSequenceValue(): Promise<number> {
        const sequenceName: string = 'venda';
        const sequenceDocument = await prismaClient.counter.upsert({
            where: { name: sequenceName },
            update: { seq: { increment: 1 } },
            create: { name: sequenceName, seq: 1 },
        });

        return sequenceDocument.seq;
    }

    private async verificaSessao(
        idSessao: number
    ): Promise<{
        id: number;
        filmeId: number;
        salaId: number;
        dia: Date;
        horario: string;
        lugares: boolean[];
    } | null> {
        const sessao: Sessao | null = await prismaClient.sessao.findUnique({
            where: {
                id: idSessao,
            },
        });
        return sessao;
    }

    async createVenda(){
        const { idSessao, novoLugar } = this._req.body as {
            idSessao: number;
            novoLugar: number;
        };

        try {
            const sessao = await this.verificaSessao(idSessao);
            if (sessao !== null && novoLugar <= sessao.lugares.length) {
                const novoslugares = [...sessao.lugares];
                if (novoslugares[novoLugar - 1] === true) {
                    return this._res.status(404).json({
                        message: `Venda não pode ser realizada porque o lugar ${novoLugar} já esta reservado`
                    })
                }
                novoslugares[novoLugar - 1] = true;
                await prismaClient.sessao.update({
                    where: {id: idSessao},
                    data: {
                        lugares: novoslugares
                    }
                })
                const seqId = await this.getNextSequenceValue();
                await prismaClient.venda.create({
                    data: {
                        id: seqId,
                        sessaoId: idSessao,
                        lugar: novoLugar,
                    }
                })
                this._res.status(200).json({
                    message: `Venda com id ${seqId} criada com sucesso`
                })
            } else{
                this._res.status(404).json({
                    message: `Sessão inválida ou Numero de lugar maior que a sala da sessão`
                })
            }
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.log(error);
        }
    }

    // Promise<{id: number, sessaoId: number, lugar: number, valorTotal: number}>

    async findOneVenda(): Promise<{id: number, sessaoId: number, lugar: number, valorTotal: number} | null>{
        const idVenda = Number(this._req.params.id);
        try {
            const venda: Venda | null = await prismaClient.venda.findUnique({
                where: {
                    id: idVenda,
                },
            });
            venda !== null
                ? this._res.status(200).json({ venda: venda })
                : this._res
                      .status(404)
                      .json({ message: 'Venda não encontrada' });
            return venda;
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.error(error);
            return null;
        }
    }
    async findAllVendas() : Promise<{id: number, sessaoId: number, lugar: number, valorTotal: number}[] | null>{
        try {
            const vendas: Venda[] | null =
                await prismaClient.venda.findMany();
            vendas != null
                ? this._res.status(200).json(vendas)
                : this._res
                      .status(404)
                      .json({ message: 'Nenhuma sala encontrada' });
            return vendas;
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.error(error);
            return null;
        }
    }
    
}
