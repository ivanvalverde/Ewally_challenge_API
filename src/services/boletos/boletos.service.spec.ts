import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorMessages } from '../../shared/enums/errorMessages';
import {
  mockTitleDocumentAmount,
  mockConventionboletoInfoObj,
  mockConventionDocumentDigitableLine,
  mockExpirationDate,
  mockServiceConventionDocumentResponse,
  mockServiceTitleDocumentResponse,
  mockTitleboletoInfoObj,
  mockTitleDocumentDigitableLine,
  mockConventionDocumentAmount,
} from '../../shared/mocks/mocks';
import { ValidationUtils } from '../../utils/validationUtils';
import { BoletosService } from './boletos.service';

describe('BoletosService', () => {
  let service: BoletosService;
  let utils: ValidationUtils;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoletosService,
        {
          provide: ValidationUtils,
          useFactory: () => ({
            validateVerificationDigits: jest.fn(),
            validateBarCodeDigit: jest.fn(),
            validateNumbersOnlyAndLength: jest.fn(),
            getExpirationDate: jest.fn((obj) => {
              if (obj.expirationFactor) return mockExpirationDate;
              return '';
            }),
            getAmount: jest.fn((obj) => {
              if (obj.expirationFactor) return mockTitleDocumentAmount;
              return mockConventionDocumentAmount;
            }),
            getBoletoInformations: jest.fn((str) => {
              if (str.length === 47) return mockTitleboletoInfoObj;
              return mockConventionboletoInfoObj;
            }),
          }),
        },
      ],
    }).compile();

    service = module.get<BoletosService>(BoletosService);
    utils = module.get<ValidationUtils>(ValidationUtils);
  });

  describe('getBoletoByDigitableLine', () => {
    it('should return data given a title document digitable line', () => {
      expect(
        service.getBoletoByDigitableLine(mockTitleDocumentDigitableLine),
      ).toEqual(mockServiceTitleDocumentResponse);
    });

    it('should return data given a convention document digitable line', () => {
      expect(
        service.getBoletoByDigitableLine(mockConventionDocumentDigitableLine),
      ).toEqual(mockServiceConventionDocumentResponse);
    });

    it('should throw an error if validateVerificationDigits throws ', () => {
      jest.spyOn(utils, 'validateVerificationDigits').mockImplementation(() => {
        throw new HttpException(
          ErrorMessages.VERIFICATION_DIGITS_VALIDATION_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      });
      expect(() =>
        service.getBoletoByDigitableLine(mockConventionDocumentDigitableLine),
      ).toThrow(
        new HttpException(
          ErrorMessages.VERIFICATION_DIGITS_VALIDATION_FAILED,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw an error if validateNumbersOnlyAndLength throws ', () => {
      jest
        .spyOn(utils, 'validateNumbersOnlyAndLength')
        .mockImplementation(() => {
          throw new HttpException(
            ErrorMessages.NOT_NUMERIC_ERROR_MESSAGE,
            HttpStatus.BAD_REQUEST,
          );
        });
      expect(() =>
        service.getBoletoByDigitableLine(mockConventionDocumentDigitableLine),
      ).toThrow(
        new HttpException(
          ErrorMessages.NOT_NUMERIC_ERROR_MESSAGE,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw an error if validateBarCodeDigit throws ', () => {
      jest.spyOn(utils, 'validateBarCodeDigit').mockImplementation(() => {
        throw new HttpException(
          ErrorMessages.VERIFICATION_DIGIT_BAR_CODE_VALIDATION_FAILED,
          HttpStatus.BAD_REQUEST,
        );
      });
      expect(() =>
        service.getBoletoByDigitableLine(mockConventionDocumentDigitableLine),
      ).toThrow(
        new HttpException(
          ErrorMessages.VERIFICATION_DIGIT_BAR_CODE_VALIDATION_FAILED,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
