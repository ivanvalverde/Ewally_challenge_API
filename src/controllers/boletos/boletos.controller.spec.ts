import { Test, TestingModule } from '@nestjs/testing';
import { BoletosService } from '../../services/boletos/boletos.service';
import { BoletosController } from './boletos.controller';

describe('BoletosController', () => {
  let controller: BoletosController;
  let service: BoletosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletosController],
      providers: [
        {
          provide: BoletosService,
          useFactory: () => ({
            getBoletoByDigitableLine: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<BoletosController>(BoletosController);
    service = module.get<BoletosService>(BoletosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
