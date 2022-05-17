import { Test, TestingModule } from '@nestjs/testing'
import { JobService } from './job.service'
import { createMock } from '@golevelup/ts-jest'
import { EntityRepository } from '@mikro-orm/core'
import { Job } from './entities/job.entity'
import { getRepositoryToken } from '@mikro-orm/nestjs'
import { CreateJobInput } from './dto/create-job.input'
import { JobLevel, JobRegiment } from './gql/enum'
import { companyStub } from '../../test/stubs/company.stub'
import { jobStub } from '../../test/stubs/job.stub'
import { NotFoundException } from '@nestjs/common'
import { UpdateJobInput } from './dto/update-job.input'

describe('JobService', () => {
  let service: JobService

  const jobRepositoryMock = createMock<EntityRepository<Job>>({
    count: jest.fn().mockResolvedValue(0)
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobService,
        { provide: getRepositoryToken(Job), useValue: jobRepositoryMock }
      ]
    }).compile()

    service = module.get<JobService>(JobService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a new job post', async () => {
      const data: CreateJobInput = {
        description: 'some description',
        level: JobLevel.JR,
        regiment: JobRegiment.INTERNSHIP,
        remote: false,
        requisites: 'some requisites',
        salary: 'some salary',
        title: 'some title'
      }

      await service.create(companyStub, data)

      expect(jobRepositoryMock.persistAndFlush).toHaveBeenCalled()
    })
  })

  describe('findAll', () => {
    it('should find all non deleted jobs', async () => {
      jobRepositoryMock.find.mockResolvedValue([jobStub])

      const result = await service.findAll()

      expect(result).toEqual([jobStub])
    })
  })

  describe('findOne', () => {
    it('should throw NotFoundException if no job was found', async () => {
      jobRepositoryMock.findOne.mockResolvedValue(null)

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException)
    })

    it('should return job from given id', async () => {
      jobRepositoryMock.findOne.mockResolvedValue(jobStub)

      const result = await service.findOne(1)

      expect(result).toStrictEqual(jobStub)
    })
  })

  describe('findOneBySlug', () => {
    it('should throw NotFoundException if no job was found', async () => {
      jobRepositoryMock.findOne.mockResolvedValue(null)

      await expect(service.findOneBySlug('some-slug')).rejects.toThrow(
        NotFoundException
      )
    })

    it('should return job from given slug', async () => {
      jobRepositoryMock.findOne.mockResolvedValue(jobStub)

      const result = await service.findOneBySlug('some-slug')

      expect(result).toStrictEqual(jobStub)
    })
  })

  describe('update', () => {
    const updateData: UpdateJobInput = {
      id: 1,
      description: 'some description',
      level: JobLevel.JR,
      regiment: JobRegiment.INTERNSHIP,
      remote: false,
      requisites: 'some requisites',
      salary: 'some salary',
      title: 'some title'
    }

    it('should throw NotFoundException if no job was found', async () => {
      jobRepositoryMock.findOne.mockResolvedValue(null)

      await expect(service.update(companyStub, updateData)).rejects.toThrow(
        NotFoundException
      )
    })

    it('should update a job post', async () => {
      jobRepositoryMock.findOne.mockResolvedValue(jobStub)

      await service.update(companyStub, updateData)

      expect(jobRepositoryMock.persistAndFlush).toHaveBeenCalled()
    })
  })

  describe('remove', () => {
    it('should throw NotFoundException if no job was found', async () => {
      jobRepositoryMock.findOne.mockResolvedValue(null)

      await expect(service.remove(companyStub, 1)).rejects.toThrow(
        NotFoundException
      )
    })

    it('should soft delete a job post', async () => {
      jobRepositoryMock.findOne.mockResolvedValue(jobStub)

      await service.remove(companyStub, 1)

      expect(jobRepositoryMock.persistAndFlush).toHaveBeenCalled()
    })
  })
})
