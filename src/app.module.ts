import { Module } from '@nestjs/common';
import { BoletosController } from './controllers/boletos/boletos.controller';
import { BoletosService } from './services/boletos/boletos.service';

@Module({
  imports: [],
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class AppModule {}
