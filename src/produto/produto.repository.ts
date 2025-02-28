import { Repository } from 'typeorm';
import { ProdutoEntity } from './produto.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';

@Injectable()
export class ProdutoRepository {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepo: Repository<ProdutoEntity>,
    ) {}

    async update(id: string, novosDados: AtualizaProdutoDTO) {
        const produto = await this.produtoRepo.findOneBy({ id });
        Object.assign(produto, novosDados);
        this.produtoRepo.save(produto);
    }

    async findByCategoria(categoria: string): Promise<ProdutoEntity[]> {
        return this.produtoRepo.find({ where: { categoria } });
    }

    async create(produto: ProdutoEntity) {
        return this.produtoRepo.save(produto);
    }

    async delete(id: string) {
        return this.produtoRepo.delete(id);
    }
}
