import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ErrorMessages } from '../shared/enums/errorMessages';
import {
  mockConventionboletoInfoObj,
  mockConventionDocumentAmount,
  mockConventionDocumentDigitableLine,
  mockDigitableLineIncorrectLength,
  mockDigitableLineWithLetters,
  mockExpirationDate,
  mockListSum,
  mockListToMultiply,
  mockMultipliedList,
  mockNumbersListToSum,
  mockTitleboletoInfoObj,
  mockTitleDocumentAmount,
  mockTitleDocumentDigitableLine,
  mockWrongConventionboletoInfoObj,
  mockWrongTitleboletoInfoObj,
} from '../shared/mocks/mocks';
import { ValidationUtils } from './validationUtils';

describe('BoletosController', () => {
  let utils: ValidationUtils;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationUtils],
    }).compile();

    utils = module.get<ValidationUtils>(ValidationUtils);
  });

  describe('validateNumbersOnlyAndLength', () => {
    it('should return an error due to not only numbers in the given parameter', () => {
      expect(() => {
        utils.validateNumbersOnlyAndLength(mockDigitableLineWithLetters);
      }).toThrow(
        new HttpException(
          ErrorMessages.NOT_NUMERIC_ERROR_MESSAGE,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    it('should return an error due incorrect length parameter', () => {
      expect(() => {
        utils.validateNumbersOnlyAndLength(mockDigitableLineIncorrectLength);
      }).toThrow(
        new HttpException(
          ErrorMessages.INCORRECT_LENGTH_MESSAGE,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('validateNumbersOnlyAndLength', () => {
    it('should return the correct sum', () => {
      expect(utils.summingAllFieldNumbers(mockNumbersListToSum)).toEqual(
        mockListSum,
      );
    });
  });

  describe('getMultipliedList', () => {
    it('should return the multiplied list', () => {
      expect(utils.getMultipliedList(mockListToMultiply)).toEqual(
        mockMultipliedList,
      );
    });
  });

  describe('getBoletoInformations', () => {
    it('should return informations from a title document', () => {
      expect(
        utils.getBoletoInformations(mockTitleDocumentDigitableLine),
      ).toEqual(mockTitleboletoInfoObj);
    });

    it('should return informations from a convention document', () => {
      expect(
        utils.getBoletoInformations(mockConventionDocumentDigitableLine),
      ).toEqual(mockConventionboletoInfoObj);
    });
  });

  describe('getExpirationDate', () => {
    it('should return expiration date from a title document', () => {
      expect(utils.getExpirationDate(mockTitleboletoInfoObj)).toEqual(
        mockExpirationDate,
      );
    });

    it('should return an empty string from a convention document', () => {
      expect(utils.getExpirationDate(mockConventionboletoInfoObj)).toHaveLength(
        0,
      );
    });
  });

  describe('getAmount', () => {
    it('should return boleto amount from a title document', () => {
      expect(utils.getAmount(mockTitleboletoInfoObj)).toEqual(
        mockTitleDocumentAmount,
      );
    });

    it('should return boleto amount from a convention document', () => {
      expect(utils.getAmount(mockConventionboletoInfoObj)).toEqual(
        mockConventionDocumentAmount,
      );
    });
  });

  describe('validateBarCodeDigit', () => {
    it('should throw an error due to a title document unsucessful validation ', () => {
      expect(() =>
        utils.validateBarCodeDigit(mockWrongTitleboletoInfoObj),
      ).toThrow(
        new HttpException(
          ErrorMessages.VERIFICATION_DIGIT_BAR_CODE_VALIDATION_FAILED,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw an error due to a convention document unsucessful validation ', () => {
      expect(() =>
        utils.validateBarCodeDigit(mockWrongConventionboletoInfoObj),
      ).toThrow(
        new HttpException(
          ErrorMessages.VERIFICATION_DIGIT_BAR_CODE_VALIDATION_FAILED,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('validateVerificationDigits', () => {
    it('should throw an error due to a title document unsucessful validation ', () => {
      expect(() =>
        utils.validateVerificationDigits(mockWrongTitleboletoInfoObj),
      ).toThrow(
        new HttpException(
          ErrorMessages.VERIFICATION_DIGITS_VALIDATION_FAILED,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw an error due to a convention document unsucessful validation ', () => {
      expect(() =>
        utils.validateVerificationDigits(mockWrongConventionboletoInfoObj),
      ).toThrow(
        new HttpException(
          ErrorMessages.VERIFICATION_DIGITS_VALIDATION_FAILED,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
