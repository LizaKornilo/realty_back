import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../src/app.module'

describe('example test', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('should return hello message', () => {
    return request(app.getHttpServer())
      .get('/get-hello-for-everyone')
      .expect(200)
      .expect('Hello, absolutely everyone')
  })

  afterAll(async () => {
    await app.close()
  })
})
