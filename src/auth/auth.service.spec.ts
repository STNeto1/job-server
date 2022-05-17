import { Test, TestingModule } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { createMock } from '@golevelup/ts-jest'

import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { CompanyService } from '../company/company.service'
import { userStub } from '../../test/stubs/user.stub'
import { companyStub } from '../../test/stubs/company.stub'

describe('AuthService', () => {
  let service: AuthService

  const mockedJwtService = createMock<JwtService>({
    sign: jest.fn().mockReturnValue('jwt')
  })
  const mockedUserService = createMock<UserService>({
    findByEmailAndPassword: jest.fn().mockReturnValue(userStub)
  })

  const mockedCompanyService = createMock<CompanyService>({
    findWithCredentials: jest.fn().mockResolvedValue(companyStub)
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockedJwtService
        },
        {
          provide: UserService,
          useValue: mockedUserService
        },
        {
          provide: CompanyService,
          useValue: mockedCompanyService
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('validateUser', () => {
    it('should return a access token', async () => {
      const response = await service.validateUser({
        email: 'mail@mail.com',
        password: '102030'
      })

      expect(response.access_token).toEqual('jwt')
    })
  })

  describe('validateCompany', () => {
    it('should return a access token', async () => {
      const response = await service.validateCompany({
        email: 'company@mail.com',
        password: '102030'
      })

      expect(response.access_token).toEqual('jwt')
    })
  })
})
