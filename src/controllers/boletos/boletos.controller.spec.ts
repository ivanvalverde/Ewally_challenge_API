import { Test, TestingModule } from '@nestjs/testing';
import {
  mockControllerResponse,
  mockTitleDocumentDigitableLine,
} from '../../shared/mocks/mocks';
import { BoletosService } from '../../services/boletos/boletos.service';
import { BoletosController } from './boletos.controller';
import { ValidationUtils } from '../../utils/validationUtils';
import { HttpException, HttpStatus } from '@nestjs/common';

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
            getBoletoByDigitableLine: jest.fn(() => mockControllerResponse),
          }),
        },
        {
          provide: ValidationUtils,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<BoletosController>(BoletosController);
    service = module.get<BoletosService>(BoletosService);
  });

  describe('getBoletoByDigitableLine', () => {
    it('should return mocked data', () => {
      expect(
        controller.getBoletoByDigitableLine(mockTitleDocumentDigitableLine),
      ).toEqual(mockControllerResponse);
    });

    it('should throw an error if service throws', () => {
      jest.spyOn(service, 'getBoletoByDigitableLine').mockImplementation(() => {
        throw new HttpException('Error', HttpStatus.BAD_REQUEST);
      });
      expect(() =>
        controller.getBoletoByDigitableLine(mockTitleDocumentDigitableLine),
      ).toThrow(new HttpException('Error', HttpStatus.BAD_REQUEST));
    });
  });
});
