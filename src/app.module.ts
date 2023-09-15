import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoasModule } from './pessoas/pessoas.module';

@Module({
  imports: [PessoasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
