import { Test, TestingModule } from '@nestjs/testing'
import { CompanyResolver } from './company.resolver'
import { CompanyService } from './company.service'
import { createMock } from '@golevelup/ts-jest'
import { Company } from './entities/company.entity'
import { CompanyType } from './gql/enum'
import { CreateCompanyInput } from './dto/create-company.input'

describe('CompanyResolver', () => {
  let resolver: CompanyResolver

  const companyServiceMock = createMock<CompanyService>({})

  const companyStub: Company = {
    id: 1,
    name: 'company',
    email: 'mail@company.com',
    password: '',
    type: CompanyType.LARGE,
    city: 'city',
    state: 'state',
    description: 'description',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyResolver,
        { provide: CompanyService, useValue: companyServiceMock }
      ]
    }).compile()

    resolver = module.get<CompanyResolver>(CompanyResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createCompany', () => {
    const createData: CreateCompanyInput = {
      city: 'some city',
      description: 'some description',
      email: 'mail@mail.com',
      name: '123',
      password: '123',
      state: 'some state',
      type: CompanyType.LARGE
    }

    it('should create a company', async () => {
      await resolver.createCompany(createData)

      expect(companyServiceMock.create).toHaveBeenCalled()
    })
  })
})
