import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  mockConventionDocumentDigitableLine,
  mockDigitableLineIncorrectLength,
  mockDigitableLineWithLetters,
  mockServiceConventionDocumentResponse,
  mockServiceTitleDocumentResponse,
  mockTitleDocumentDigitableLine,
  mockWrongConventionDocumentDigitableLine,
  mockWrongTitleDocumentDigitableLine,
} from './../src/shared/mocks/mocks';
import { ErrorMessages } from './../src/shared/enums/errorMessages';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return information about a title document, /boletos/:digitableLine (GET)', () => {
    return request(app.getHttpServer())
      .get(`/boletos/${mockTitleDocumentDigitableLine}`)
      .expect(200)
      .expect(mockServiceTitleDocumentResponse);
  });

  it('should return information about a convention document, /boletos/:digitableLine (GET)', () => {
    return request(app.getHttpServer())
      .get(`/boletos/${mockConventionDocumentDigitableLine}`)
      .expect(200)
      .expect(mockServiceConventionDocumentResponse);
  });

  it('should return an incorrect length error, /boletos/:digitableLine (GET)', () => {
    return request(app.getHttpServer())
      .get(`/boletos/${mockDigitableLineIncorrectLength}`)
      .expect(400)
      .expect({
        statusCode: 400,
        message: ErrorMessages.INCORRECT_LENGTH_MESSAGE,
      });
  });

  it('should return a non numeric error, /boletos/:digitableLine (GET)', () => {
    return request(app.getHttpServer())
      .get(`/boletos/${mockDigitableLineWithLetters}`)
      .expect(400)
      .expect({
        statusCode: 400,
        message: ErrorMessages.NOT_NUMERIC_ERROR_MESSAGE,
      });
  });

  it('should return a validation error associated to bar code digits, /boletos/:digitableLine (GET)', () => {
    return request(app.getHttpServer())
      .get(`/boletos/${mockWrongTitleDocumentDigitableLine}`)
      .expect(400)
      .expect({
        statusCode: 400,
        message: ErrorMessages.VERIFICATION_DIGIT_BAR_CODE_VALIDATION_FAILED,
      });
  });

  it('should return a validation error associated to verification digits, /boletos/:digitableLine (GET)', () => {
    return request(app.getHttpServer())
      .get(`/boletos/${mockWrongConventionDocumentDigitableLine}`)
      .expect(400)
      .expect({
        statusCode: 400,
        message: ErrorMessages.VERIFICATION_DIGITS_VALIDATION_FAILED,
      });
  });
});
