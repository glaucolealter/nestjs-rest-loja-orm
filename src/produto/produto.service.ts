import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { ProdutoRepository } from './produto.repository';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
    private readonly produtoCustomizedRepository: ProdutoRepository
  ) {}

  async criaProduto(produtoEntity: ProdutoEntity) {
    await this.produtoCustomizedRepository.create(produtoEntity);
  }

  async listProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });
    const produtosLista = produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
    return produtosLista;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    await this.produtoCustomizedRepository.update(id, novosDados);
  }

  async deletaProduto(id: string) {
    await this.produtoCustomizedRepository.delete(id);
  }

  async buscaPorCategoria(categoria: string): Promise<ProdutoEntity[]> {
    return this.produtoCustomizedRepository.findByCategoria(categoria);
  }
}
