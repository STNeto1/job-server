import { Test, TestingModule } from '@nestjs/testing'
import { CompanyResolver } from './company.resolver'
import { CompanyService } from './company.service'
import { createMock } from '@golevelup/ts-jest'
import { CompanyType } from './gql/enum'
import { CreateCompanyInput } from './dto/create-company.input'
import { companyStub } from '../../test/stubs/company.stub'

describe('CompanyResolver', () => {
  let resolver: CompanyResolver

  const companyServiceMock = createMock<CompanyService>({
    findAll: jest.fn().mockResolvedValue([companyStub]),
    findOne: jest.fn().mockResolvedValue(companyStub)
  })

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

  describe('findAll', () => {
    it('should find all companies', async () => {
      const result = await resolver.findAll()

      expect(result).toEqual([companyStub])
    })
  })

  describe('findOne', () => {
    it('should find a company', async () => {
      const result = await resolver.findOne(1)

      expect(result).toStrictEqual(companyStub)
    })
  })

  describe('updateCompany', () => {
    it('should update a company', async () => {
      await resolver.updateCompany(companyStub, {})

      expect(companyServiceMock.update).toHaveBeenCalled()
    })
  })

  describe('removeCompany', () => {
    it('should remove a company', async () => {
      await resolver.removeCompany(companyStub)

      expect(companyServiceMock.remove).toHaveBeenCalled()
    })
  })
})
