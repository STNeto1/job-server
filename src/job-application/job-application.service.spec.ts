import { createMock } from '@golevelup/ts-jest'
import { getRepositoryToken } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { jobApplicationStub } from '../../test/stubs/job-application.stub'
import { jobStub } from '../../test/stubs/job.stub'
import { userStub } from '../../test/stubs/user.stub'
import { JobService } from '../job/job.service'
import { JobApplication } from './entities/job-application.entity'
import { JobApplicationService } from './job-application.service'

describe('JobApplicationService', () => {
  let service: JobApplicationService

  const applicationRepositoryMock =
    createMock<EntityRepository<JobApplication>>()
  const jobServiceMock = createMock<JobService>({
    findOne: jest.fn().mockResolvedValue(jobStub)
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobApplicationService,
        {
          provide: getRepositoryToken(JobApplication),
          useValue: applicationRepositoryMock
        },
        {
          provide: JobService,
          useValue: jobServiceMock
        }
      ]
    }).compile()

    service = module.get<JobApplicationService>(JobApplicationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('throw BadRequestException if application already exists', async () => {
      applicationRepositoryMock.findOne.mockResolvedValue(jobApplicationStub)

      await expect(service.create(userStub, { jobId: 1 })).rejects.toThrow(
        BadRequestException
      )
    })

    it('should create a new job application', async () => {
      applicationRepositoryMock.findOne.mockResolvedValue(null)

      await service.create(userStub, { jobId: 1 })

      expect(applicationRepositoryMock.persistAndFlush).toHaveBeenCalled()
    })
  })
})
