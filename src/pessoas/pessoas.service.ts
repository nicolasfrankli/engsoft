// src/pessoas/pessoas.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; 
import { PessoaDto } from './pessoas.dto';

@Injectable()
export class PessoasService {
  private pessoas: any[] = []; 

  async criarPessoa(pessoaDto: PessoaDto) {
    const apelidoExistente = this.pessoas.find((p) => p.apelido === pessoaDto.apelido);

    if (apelidoExistente) {
      throw new HttpException('Apelido já existe', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const pessoa = {
      id: uuidv4(),
      ...pessoaDto,
    };

    this.pessoas.push(pessoa);

    return pessoa;
  }

  async buscarPessoas(id: string) {
    const pessoa = this.pessoas.find((p) => p.id === id);
  
    return pessoa;
  }

  async buscarPessoasPorTermo(termo: string) {
    termo = termo.toLowerCase();
  
    const resultados = this.pessoas.filter((pessoa) => {
      const { apelido, nome, stack } = pessoa;
      const termoEncontrado =
        apelido.toLowerCase().includes(termo) ||
        nome.toLowerCase().includes(termo) ||
        (stack && stack.some((item: string) => item.toLowerCase().includes(termo)));
      return termoEncontrado;
    });
  
    return resultados.slice(0, 50);
  }

  async contarPessoas() {
    return this.pessoas.length;
  }
}
