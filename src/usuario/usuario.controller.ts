import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    try {
      const usuarioEntity = new UsuarioEntity();
      usuarioEntity.email = dadosDoUsuario.email;
      usuarioEntity.senha = dadosDoUsuario.senha;
      usuarioEntity.nome = dadosDoUsuario.nome;
      usuarioEntity.id = uuid();

      await this.usuarioService.criaUsuario(usuarioEntity);

      return {
        usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
        mensagem: 'Usuário criado com sucesso',
      };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  @Get()
  async listUsuarios() {
    try {
      return await this.usuarioService.listUsuarios();
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      throw error;
    }
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    try {
      const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
	    id,
	    novosDados,
	  );
      return {
        usuario: usuarioAtualizado,
        mensagem: 'Usuário atualizado com sucesso',
      };
    } catch (error) {
      console.error(`Erro ao atualizar o usuário ${id}:`, error);
      throw error;
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    try {
      const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

	  return {
	    usuario: usuarioRemovido,
	    messagem: 'Usuário excluído com sucesso',
	  };
    } catch (error) {
      console.error(`Erro ao excluir usuário ${id}:`, error);
      throw error;
    }
  }
}
