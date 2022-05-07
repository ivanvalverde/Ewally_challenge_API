import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Boleto } from '../../models/boleto.model';
import { BoletosService } from '../../services/boletos/boletos.service';

@ApiTags('Boletos')
@Controller('boletos')
export class BoletosController {
  private readonly boletosService: BoletosService;
  constructor(boletosService: BoletosService) {
    this.boletosService = boletosService;
  }

  @ApiOkResponse({
    status: 200,
    description: 'Validate and returns information about given digitable line.',
    type: Boleto,
  })
  @Get('/:digitableLine')
  getBoletoByDigitableLine(
    @Param('digitableLine') digitableLine: string,
  ): Boleto {
    return this.boletosService.getBoletoByDigitableLine(digitableLine);
  }
}
