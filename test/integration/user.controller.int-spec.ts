import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import * as request from 'supertest'
import { getConnection } from 'typeorm'
import { RegisterReqDto } from '../../src/user/dto/registerReq.dto'
import { admin } from '../../src/migration/consts'

export async function clearTestDB () {
  if (process.env.NODE_ENV !== 'test') return
  const entities = getConnection().entityMetadatas
  for (const entity of entities) {
    if (entity.tableName !== 'role') {
      const repository = await getConnection().getRepository(entity.name)
      await repository.query(`TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE`)
    }
  }
  await getConnection().query(`INSERT INTO "user" (username, email, password, "activationKey", is_activated, role_id)
                               VALUES ('${admin.username}', '${admin.email}', '${admin.password}', '${admin.activationKey}', '${admin.is_activated}', '${admin.role_id}')`)
}

describe('UserController Int', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('(POST) users', () => {
    const mockUser: RegisterReqDto = {
      username: 'username',
      email: 'example@gmail.com',
      password: 'password'
    }
    const defaultRole = {
      id: 1,
      value: 'user'
    }

    it('should register a user and return the new user object', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json')
        .send(mockUser)
        .expect((response: request.Response) => {
          const { id, username, email, password, activation_key, is_activated, role } = response.body
          expect(typeof id).toBe('number')
          expect(username).toEqual(mockUser.username)
          expect(email).toEqual(mockUser.email)
          expect(password).toBeUndefined()
          expect(activation_key).toBeUndefined()
          expect(is_activated).toEqual(true)
          expect(role.id).toEqual(defaultRole.id)
          expect(role.value).toEqual(defaultRole.value)
        })
        .expect(HttpStatus.CREATED)
    })

    it('should throw on duplicate email', function () {
      return request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json')
        .send(mockUser)
        .expect((response: request.Response) => {
          expect(response.body.error).toEqual(`User with email '${mockUser.email}' is already exists`)
        })
        .expect(HttpStatus.CONFLICT)
    })
  })

  afterAll(async () => {
    await clearTestDB()
  })
})
