import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST)', async () => {
    const email = 'blahblah@abc.com';
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'abcd' })
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.email).toEqual(email);
  });
});
