import { Module } from '@nestjs/common';
import { BoletosController } from './controllers/boletos/boletos.controller';
import { BoletosService } from './services/boletos/boletos.service';
import { ValidationUtils } from './utils/validationUtils';

@Module({
  imports: [],
  controllers: [BoletosController],
  providers: [BoletosService, ValidationUtils],
})
export class AppModule {}
