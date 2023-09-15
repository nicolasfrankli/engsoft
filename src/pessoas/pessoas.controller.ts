import { Controller, Post, Body, HttpStatus, HttpException, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoaDto } from './pessoas.dto';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post()
  async criarPessoa(@Body() pessoaDto: PessoaDto) {
    try {
      const pessoa = await this.pessoasService.criarPessoa(pessoaDto);
      return {
        message: 'Pessoa criada com sucesso',
        id: pessoa.id, // Aqui você deve fornecer o ID gerado
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Get('contagem-pessoas') 
  async contarPessoas() {
    const totalPessoas = await this.pessoasService.contarPessoas();
    return { total: totalPessoas };
  }

  @Get(':id')
  async buscarPessoa(@Param('id') id: string) {
    const pessoa = await this.pessoasService.buscarPessoas(id);
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return pessoa;
  }

  @Get()
  async buscarPessoasPorTermo(@Query('t') termo: string) {
    const pessoas = await this.pessoasService.buscarPessoasPorTermo(termo);
    return pessoas;
  }


}