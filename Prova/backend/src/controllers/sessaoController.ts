import { Response, Request } from 'express';
import prismaClient from '../repository/prisma';
import { Sessao } from '@prisma/client';
import { environment } from '../environment';

export class SessaoController {
    private _req: Request;
    private _res: Response;
    constructor(req: Request, res: Response) {
        this._req = req;
        this._res = res;
    }

    private async verificaFilme(idFilme: number): Promise<boolean> {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: "Bearer " + environment.API_TOKEN,
            },
        };

        return await fetch(
            `https://api.themoviedb.org/3/movie/${idFilme}?language=pt-BR`,
            options
        )
            .then((response) => response.json())
            .then((response) => {

                if (response.success === false) {
                    return false;
                } else return true;
            })
            .catch((err) => {
                console.error(err);
                return false;
            });
    }

    private async verificaSala(
        idSala: number
    ): Promise<{ id: number; lugares: number } | null> {
        const sala = await prismaClient.sala.findUnique({
            where: {
                id: idSala,
            },
        });
        return sala;
    }

    async getNextSequenceValue(): Promise<number> {
        const sequenceName: string = 'sessao';
        const sequenceDocument = await prismaClient.counter.upsert({
            where: { name: sequenceName },
            update: { seq: { increment: 1 } },
            create: { name: sequenceName, seq: 1 },
        });

        return sequenceDocument.seq;
    }

    async createSessao() {
        const { idFilme, idSala, dataSessao, horario } = this._req.body as {
            idSala: number;
            idFilme: number;
            dataSessao: Date;
            horario: string;
        };
        try {
            const filme = await this.verificaFilme(idFilme);
            const sala = await this.verificaSala(idSala);
            console.log(filme);
            
            if (filme === true && sala !== null) {
                let nexSeq: number = await this.getNextSequenceValue();
                await prismaClient.sessao.create({
                    data: {
                        id: nexSeq,
                        filmeId: idFilme,
                        salaId: idSala,
                        dia: dataSessao,
                        lugares: Array(sala?.lugares).fill(false),
                        horario: horario,
                    },
                });
                this._res.status(200).json({
                    message: `Cadastro da sessão com ID ${nexSeq} realizado com sucesso`,
                });
            } else if (filme === false && sala === null) {
                this._res.status(400).json({
                    message: `Sala e Filme enviados para cadastro da sessão são inválidos`,
                });
            } else if (filme === false && sala !== null) {
                this._res.status(400).json({
                    message: `Filme enviado para cadastro da sessão são inválidos`,
                });
            } else {
                this._res.status(400).json({
                    message: `Sala enviada para cadastro da sessão são inválidos`,
                });
            }
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.log(error);
        }
    }

    async findOneSessao(): Promise<{
        id: number;
        filmeId: number;
        salaId: number;
        dia: Date;
        horario: string;
        lugares: boolean[];
    } | null> {
        const idSala = Number(this._req.params.id);

        try {
            const sessao: Sessao | null = await prismaClient.sessao.findUnique({
                where: {
                    id: idSala,
                },
            });
            sessao !== null
                ? this._res.status(200).json({ sala: sessao })
                : this._res
                      .status(404)
                      .json({ message: 'Sala não encontrada' });
            return sessao;
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.error(error);
            return null;
        }
    }

    async findAllSessoes(): Promise<
        | {
              id: number;
              filmeId: number;
              salaId: number;
              dia: Date;
              horario: string;
              lugares: boolean[];
          }[]
        | null
    > {
        try {
            const sessoes: Sessao[] | null =
                await prismaClient.sessao.findMany();
            sessoes != null
                ? this._res.status(200).json(sessoes)
                : this._res
                      .status(404)
                      .json({ message: 'Nenhuma sala encontrada' });
            return sessoes;
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.error(error);
            return null;
        }
    }

    async findAllSessoesAsc(): Promise<
        | {
              id: number;
              filmeId: number;
              salaId: number;
              dia: Date;
              horario: string;
              lugares: boolean[];
          }[]
        | null
    > {
        try {
            const sessoes: Sessao[] | null =
                await prismaClient.sessao.findMany({
                    orderBy:{
                        dia: 'asc',
                    }
                });
            sessoes != null
                ? this._res.status(200).json(sessoes)
                : this._res
                      .status(404)
                      .json({ message: 'Nenhuma sala encontrada' });
            return sessoes;
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.error(error);
            return null;
        }
    }

    async updateSessao(): Promise<{
        id: number;
        filmeId: number;
        salaId: number;
        dia: Date;
        horario: string;
        lugares: boolean[];
    } | null> {
        const { idSessao, idFilme, dataSessao, horario, sessaoLugares } = this
            ._req.body as {
            idSessao: number;
            idFilme: number;
            dataSessao: Date;
            horario: string;
            sessaoLugares: boolean[];
        };
        try {
            const filme = await this.verificaFilme(idFilme);
            if (filme === true) {
                const sessao: Sessao = await prismaClient.sessao.update({
                    where: { id: idSessao },
                    data: {
                        filmeId: idFilme,
                        dia: dataSessao,
                        lugares: sessaoLugares,
                        horario: horario,
                    },
                });
                this._res.status(200).json({
                    message: `Sessão com ID ${idSessao} atualizado com sucesso`,
                });
                return sessao;
            } else {
                this._res.status(404).json({
                    message: `Sessao com ID ${idSessao} não encontrado ou filme inválido`,
                });
                return null;
            }
        } catch (error) {
            this._res.status(400).json({ message: error });
            console.log(error);
            return null;
        }
    }

    async deleteSessao() {
        const idSessao = Number(this._req.params.id);
        try {
            await prismaClient.sessao.delete({
                where: { id: idSessao },
            });
            this._res.status(200).json({
                message: `Sala com ID ${idSessao} deletado com sucesso`,
            });
        } catch (error) {
            this._res
                .status(404)
                .json({ message: `Sala com ID ${idSessao} não encontrado` });
        }
    }
}
