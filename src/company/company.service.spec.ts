import { Test, TestingModule } from '@nestjs/testing'
import { CompanyService } from './company.service'
import { createMock } from '@golevelup/ts-jest'
import { EntityRepository, Loaded } from '@mikro-orm/core'
import { Company } from './entities/company.entity'
import { getRepositoryToken } from '@mikro-orm/nestjs'
import { CompanyType } from './gql/enum'
import { CreateCompanyInput } from './dto/create-company.input'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { companyStub } from '../../test/stubs/company.stub'

describe('CompanyService', () => {
  let service: CompanyService

  const companyRepositoryMock = createMock<EntityRepository<Company>>()

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

  describe('findAll', () => {
    it('should find all companies', async () => {
      companyRepositoryMock.find.mockResolvedValue([companyStub])

      const result = await service.findAll()

      expect(result).toEqual([companyStub])
    })
  })

  describe('findOne', () => {
    it('should throw NotFoundException if no company was found', async () => {
      companyRepositoryMock.findOne.mockResolvedValue(null)

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException)
    })

    it('should find and return a company', async () => {
      companyRepositoryMock.findOne.mockResolvedValue(companyStub)

      const result = await service.findOne(1)

      expect(result).toStrictEqual(companyStub)
    })
  })

  describe('findWithCredentials', () => {
    it('should throw BadRequestException if no email was found', async () => {
      companyRepositoryMock.findOne.mockResolvedValue(null)

      await expect(
        service.findWithCredentials({
          email: 'mail@mail.com',
          password: '102030'
        })
      ).rejects.toThrow(BadRequestException)
    })

    it('should throw BadRequestException if password does not match', async () => {
      companyRepositoryMock.findOne.mockResolvedValue({
        ...companyStub,
        password: await hash('password')
      })

      await expect(
        service.findWithCredentials({
          email: 'mail@mail.com',
          password: '102030'
        })
      ).rejects.toThrow(BadRequestException)
    })

    it('should return the given company', async () => {
      const stubWithHash: Loaded<Company, string> = {
        ...companyStub,
        password: await hash('password')
      }
      companyRepositoryMock.findOne.mockResolvedValue(stubWithHash)

      const result = await service.findWithCredentials({
        email: 'mail@mail.com',
        password: 'password'
      })

      expect(result).toStrictEqual(stubWithHash)
    })
  })

  describe('update', () => {
    it('should BadRequestException if new email in usage', async () => {
      companyRepositoryMock.findOne.mockResolvedValue(companyStub)

      await expect(
        service.update(companyStub, { email: 'in-use@mail.com' })
      ).rejects.toThrow(BadRequestException)
    })

    it('should update an company', async () => {
      companyRepositoryMock.findOne.mockResolvedValue(null)

      await service.update(companyStub, {
        name: 'new company name',
        password: 'new-password'
      })

      expect(companyRepositoryMock.persistAndFlush).toHaveBeenCalled()
    })
  })

  describe('remove', () => {
    it('should soft delete the company', async () => {
      await service.remove(companyStub)

      expect(companyRepositoryMock.persistAndFlush).toHaveBeenCalled()
    })
  })
})
