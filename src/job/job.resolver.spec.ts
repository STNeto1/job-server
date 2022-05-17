import { Test, TestingModule } from '@nestjs/testing'
import { JobResolver } from './job.resolver'
import { JobService } from './job.service'
import { createMock } from '@golevelup/ts-jest'
import { JobLevel, JobRegiment } from './gql/enum'
import { companyStub } from '../../test/stubs/company.stub'
import { jobStub } from '../../test/stubs/job.stub'

describe('JobResolver', () => {
  let resolver: JobResolver

  const jobServiceMock = createMock<JobService>({
    findAll: jest.fn().mockResolvedValue([jobStub]),
    findOne: jest.fn().mockResolvedValue(jobStub),
    findOneBySlug: jest.fn().mockResolvedValue(jobStub)
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobResolver,
        { provide: JobService, useValue: jobServiceMock }
      ]
    }).compile()

    resolver = module.get<JobResolver>(JobResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createJob', () => {
    it('should create a job', async () => {
      await resolver.createJob(companyStub, {
        description: 'some description',
        level: JobLevel.JR,
        regiment: JobRegiment.INTERNSHIP,
        remote: false,
        requisites: 'some requisites',
        salary: 'some salary',
        title: 'some title'
      })

      expect(jobServiceMock.create).toHaveBeenCalled()
    })
  })

  describe('findAll', () => {
    it('should find all jobs', async () => {
      const result = await resolver.findAll()

      expect(result).toEqual([jobStub])
    })
  })

  describe('findOne', () => {
    it('should find a job ', async () => {
      const result = await resolver.findOne(1)

      expect(result).toStrictEqual(jobStub)
    })
  })

  describe('findOneBySlug', () => {
    it('should find a job for given slug ', async () => {
      const result = await resolver.findOneBySlug('some-job')

      expect(result).toStrictEqual(jobStub)
    })
  })

  describe('updateJob', () => {
    it('should update a job', async () => {
      await resolver.updateJob(companyStub, {
        id: 1,
        description: 'some description',
        level: JobLevel.JR,
        regiment: JobRegiment.INTERNSHIP,
        remote: false,
        requisites: 'some requisites',
        salary: 'some salary',
        title: 'some title'
      })

      expect(jobServiceMock.update).toHaveBeenCalled()
    })
  })

  describe('removeJob', () => {
    it('should remove a job', async () => {
      await resolver.removeJob(companyStub, 1)

      expect(jobServiceMock.remove).toHaveBeenCalled()
    })
  })
})
