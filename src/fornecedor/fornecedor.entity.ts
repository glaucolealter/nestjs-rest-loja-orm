import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { ProdutoEntity } from '../produto/produto.entity';

@Entity({ name: 'fornecedores' })
export class FornecedorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'cnpj', length: 14, nullable: false, unique: true })
    cnpj: string;

    @OneToMany(() => ProdutoEntity, (p) => p.fornecedor)
    produtos: ProdutoEntity[];
}
