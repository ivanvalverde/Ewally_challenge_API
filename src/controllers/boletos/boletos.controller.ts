import { Controller, Get, Param } from '@nestjs/common';
import { Boleto } from '../../models/boleto.model';
import { BoletosService } from '../../services/boletos/boletos.service';

@Controller('boletos')
export class BoletosController {
  private readonly boletosService: BoletosService;
  constructor(boletosService: BoletosService) {
    this.boletosService = boletosService;
  }

  @Get('/:id')
  getBoletoByNumber(@Param('id') id: string): Boleto {
    return this.boletosService.getBoletoByNumber(id);
  }
}
