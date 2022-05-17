import { Test, TestingModule } from '@nestjs/testing'
import { AuthResolver } from './auth.resolver'
import { createMock } from '@golevelup/ts-jest'
import { AuthService } from './auth.service'
import { userStub } from '../../test/stubs/user.stub'
import { companyStub } from '../../test/stubs/company.stub'

describe('AuthResolver', () => {
  let resolver: AuthResolver

  const mockedUserService = createMock<AuthService>({
    validateUser: jest.fn().mockResolvedValue({ access_token: 'jwt' }),
    validateCompany: jest.fn().mockResolvedValue({ access_token: 'jwt' })
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockedUserService
        }
      ]
    }).compile()

    resolver = module.get<AuthResolver>(AuthResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('login', () => {
    it('should return a access token for login', async () => {
      const result = await resolver.login({
        email: 'mail@mail.com',
        password: '102030'
      })

      expect(result).toStrictEqual({
        access_token: 'jwt'
      })
    })
  })

  describe('companyLogin', () => {
    it('should return a access token for login', async () => {
      const result = await resolver.companyLogin({
        email: 'company@mail.com',
        password: '102030'
      })

      expect(result).toStrictEqual({
        access_token: 'jwt'
      })
    })
  })

  describe('whoAmi', () => {
    it('should return logged user', async () => {
      const result = await resolver.whoAmi(userStub)

      expect(result).toStrictEqual(userStub)
    })
  })

  describe('whoCompanyAmi', () => {
    it('should return logged company', async () => {
      const result = await resolver.whoCompanyAmI(companyStub)

      expect(result).toStrictEqual(companyStub)
    })
  })
})
