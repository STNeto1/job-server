import { Test, TestingModule } from '@nestjs/testing'
import { CompanyService } from './company.service'
import { createMock } from '@golevelup/ts-jest'
import { EntityRepository } from '@mikro-orm/core'
import { Company } from './entities/company.entity'
import { getRepositoryToken } from '@mikro-orm/nestjs'
import { CompanySize, CompanyType } from './gql/enum'
import { CreateCompanyInput } from './dto/create-company.input'
import { BadRequestException } from '@nestjs/common'

describe('CompanyService', () => {
  let service: CompanyService

  const companyRepositoryMock = createMock<EntityRepository<Company>>()

  const companyStub: Company = {
    id: 1,
    name: 'company',
    email: 'mail@company.com',
    password: '',
    type: CompanyType.LARGE,
    size: CompanySize.LARGE,
    city: 'city',
    state: 'state',
    description: 'description',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useValue: companyRepositoryMock
        }
      ]
    }).compile()

    service = module.get<CompanyService>(CompanyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    const createData: CreateCompanyInput = {
      city: 'some city',
      description: 'some description',
      email: 'mail@mail.com',
      name: '123',
      password: '123',
      size: CompanySize.LARGE,
      state: 'some state',
      type: CompanyType.LARGE
    }

    it('should throw BadRequestException if email in use', async () => {
      companyRepositoryMock.findOne.mockResolvedValue(companyStub)

      await expect(service.create(createData)).rejects.toThrow(
        BadRequestException
      )
    })

    it('should create a company', async () => {
      companyRepositoryMock.findOne.mockResolvedValue(null)

      await service.create(createData)

      expect(companyRepositoryMock.create).toHaveBeenCalled()
      expect(companyRepositoryMock.persistAndFlush).toHaveBeenCalled()
    })
  })
})
