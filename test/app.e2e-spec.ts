import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  mockConventionDocumentDigitableLine,
  mockServiceConventionDocumentResponse,
  mockServiceTitleDocumentResponse,
  mockTitleDocumentDigitableLine,
} from './../src/shared/mocks/mocks';

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
});
