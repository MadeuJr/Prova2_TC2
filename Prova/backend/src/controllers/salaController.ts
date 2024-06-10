import { Response, Request } from 'express';
import prismaClient from '../repository/prisma';
import { Sala } from '@prisma/client';

export class SalaController {
    private _req: Request;
    private _res: Response;
    constructor(req: Request, res: Response) {
        this._req = req;
        this._res = res;
    }

    async createSala() {
        const { idSala, lugaresSala } = this._req.body as {
            idSala: number;
            lugaresSala: number;
        };
        try {
            await prismaClient.sala.create({
                data: {
                    id: idSala,
                    lugares: lugaresSala,
                },
            });
            this._res.status(200).json({
                message: `Cadastro da sala com ID ${idSala} realizado com sucesso`,
            });
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.log(error);
        }
    }

    async findOneSala(): Promise<{ id: number; lugares: number } | null> {
        const idSala = Number(this._req.params.id);

        try {
            const sala: Sala | null = await prismaClient.sala.findUnique({
                where: {
                    id: idSala,
                },
            });
            sala != null
                ? this._res.status(200).json({ sala })
                : this._res
                      .status(404)
                      .json({ message: 'Sala não encontrada' });
            return sala;
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.error(error)
            return null;
        }
    }

    async findAllSalas(): Promise<{ id: number; lugares: number }[] | null> {
        try {
            const salas: Sala[] | null = await prismaClient.sala.findMany();
            salas != null ? this._res.status(200).json( salas ) : this._res.status(404).json({ message: 'Nenhuma sala encontrada'});
            return salas
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.error(error)
            return null;
        }        
    }

    async updateSala(): Promise<{ id: number; lugares: number } | null>{
        const { idSala, lugaresSala } = this._req.body as {
            idSala: number;
            lugaresSala: number;
        }
        try {
            const sala:Sala = await prismaClient.sala.update({
                where: {id: idSala},
                data: {
                    lugares: lugaresSala
                }
            })
            sala != null ? this._res.status(200).json({message: `Sala com ID ${idSala} atualizado com sucesso`}) :
            this._res.status(404).json({message: "Sala não encontrada"})
            return sala;
        } catch (error) {
            this._res.status(400).json({message: error});
            return null;
        }
    }

    async deleteSala() {
        const idSala = Number(this._req.params.id);
        try {
            await prismaClient.sala.delete({
                where: { id: idSala }
            })
            this._res.status(200).json({ message: `Sala com ID ${idSala} deletado com sucesso`})
        } catch (error) {
            this._res.status(404).json({ message: `Sala com ID ${idSala} não encontrado`})
        }
    }
}
