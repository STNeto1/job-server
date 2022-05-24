import { createMock } from '@golevelup/ts-jest'
import { getRepositoryToken } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { BadRequestException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { companyStub } from '../../test/stubs/company.stub'
import { jobApplicationStub } from '../../test/stubs/job-application.stub'
import { jobStub } from '../../test/stubs/job.stub'
import { userStub } from '../../test/stubs/user.stub'
import { JobService } from '../job/job.service'
import { JobApplication } from './entities/job-application.entity'
import { JobApplicationService } from './job-application.service'
import { ApplicationStatus } from './gql/enum'
import { JobApplicationMessage } from './entities/job-application-message.entity'

describe('JobApplicationService', () => {
  let service: JobApplicationService

  const applicationRepositoryMock =
    createMock<EntityRepository<JobApplication>>()

  const messageRepositoryMock =
    createMock<EntityRepository<JobApplicationMessage>>()
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
          provide: getRepositoryToken(JobApplicationMessage),
          useValue: messageRepositoryMock
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
      applicationRepositoryMock.findOne.mockResolvedValue({
        ...jobApplicationStub
      })

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

  describe('findAll', () => {
    it('should find all job applications', async () => {
      applicationRepositoryMock.find.mockResolvedValue([
        { ...jobApplicationStub }
      ])

      const result = await service.findAll()

      expect(result).toEqual([jobApplicationStub])
    })
  })

  describe('findAllUserApplications', () => {
    it('should find all user job applications', async () => {
      applicationRepositoryMock.find.mockResolvedValue([
        { ...jobApplicationStub }
      ])

      const result = await service.findAllUserApplications(userStub)

      expect(result).toEqual([jobApplicationStub])
    })
  })

  describe('findAllCompanyApplications', () => {
    it('should find all company related job applications', async () => {
      applicationRepositoryMock.find.mockResolvedValue([
        { ...jobApplicationStub }
      ])

      const result = await service.findAllCompanyApplications(companyStub)

      expect(result).toEqual([jobApplicationStub])
    })
  })

  describe('findUserApplication', () => {
    it('should throw BadRequestException if no job application is found', async () => {
      applicationRepositoryMock.findOne.mockResolvedValue(null)

      await expect(service.findUserApplication(userStub, 1)).rejects.toThrow(
        BadRequestException
      )
    })

    it('should return the user application', async () => {
      applicationRepositoryMock.findOne.mockResolvedValue({
        ...jobApplicationStub
      })

      const result = await service.findUserApplication(userStub, 1)

      expect(result).toStrictEqual(jobApplicationStub)
    })
  })

  describe('findCompanyApplication', () => {
    it('should throw BadRequestException if no job application is found', async () => {
      applicationRepositoryMock.findOne.mockResolvedValue(null)

      await expect(
        service.findCompanyApplication(companyStub, 1)
      ).rejects.toThrow(BadRequestException)
    })

    it('should return the company related application', async () => {
      applicationRepositoryMock.findOne.mockResolvedValue({
        ...jobApplicationStub
      })

      const result = await service.findCompanyApplication(companyStub, 1)

      expect(result).toStrictEqual(jobApplicationStub)
    })
  })

  describe('update', () => {
    describe('markApplicationAsProcessing', () => {
      const processingApplicationStub: JobApplication = {
        ...jobApplicationStub,
        status: ApplicationStatus.PROCESSING
      }

      it('should throw BadRequestException if application is not open', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce({
          ...processingApplicationStub
        })

        await expect(
          service.markApplicationAsProcessing(companyStub, 1)
        ).rejects.toThrow(BadRequestException)
      })

      it('should mark application as processing', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce({
          ...jobApplicationStub,
          status: ApplicationStatus.OPEN
        })

        await service.markApplicationAsProcessing(companyStub, 1)

        expect(applicationRepositoryMock.persistAndFlush).toHaveBeenCalledWith({
          ...jobApplicationStub,
          status: ApplicationStatus.OPEN
        })
      })
    })

    describe('markApplicationAsFinished', () => {
      const openApplicationStub: JobApplication = {
        ...jobApplicationStub,
        status: ApplicationStatus.OPEN
      }

      it('should throw BadRequestException if application is not processing', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce(
          openApplicationStub
        )

        await expect(
          service.markApplicationAsFinished(companyStub, 1)
        ).rejects.toThrow(BadRequestException)
      })

      it('should mark application as finished', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce({
          ...jobApplicationStub,
          status: ApplicationStatus.PROCESSING
        })

        await service.markApplicationAsFinished(companyStub, 1)

        expect(applicationRepositoryMock.persistAndFlush).toHaveBeenCalledWith({
          ...jobApplicationStub,
          status: ApplicationStatus.PROCESSING
        })
      })
    })

    describe('cancelJobApplication', () => {
      const processingJobApplication: JobApplication = {
        ...jobApplicationStub,
        status: ApplicationStatus.PROCESSING
      }

      it('should throw BadRequestException if application is not cancelled', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce({
          ...processingJobApplication
        })

        await expect(service.cancelJobApplication(userStub, 1)).rejects.toThrow(
          BadRequestException
        )
      })

      it('should cancel application', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce({
          ...jobApplicationStub
        })

        await service.cancelJobApplication(userStub, 1)

        expect(applicationRepositoryMock.persistAndFlush).toHaveBeenCalledWith(
          jobApplicationStub
        )
      })
    })

    describe('giveUpJobApplication', () => {
      const invalidStatusJobApplication: JobApplication = {
        ...jobApplicationStub,
        status: ApplicationStatus.GIVEN_UP
      }

      it('should throw BadRequestException if application is not processing or open', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce({
          ...invalidStatusJobApplication
        })

        await expect(
          service.giveUpJobApplication(companyStub, 1)
        ).rejects.toThrow(BadRequestException)
      })

      it('should given up on application', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce({
          ...jobApplicationStub
        })

        await service.giveUpJobApplication(companyStub, 1)

        expect(applicationRepositoryMock.persistAndFlush).toHaveBeenCalledWith(
          jobApplicationStub
        )
      })
    })

    describe('sendMessageFromUser', () => {
      it('should store message from user', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce(
          jobApplicationStub
        )

        await service.sendMessageFromUser(userStub, {
          jobId: 1,
          message: 'message'
        })

        expect(messageRepositoryMock.persistAndFlush).toHaveBeenCalled()
      })
    })

    describe('sendMessageFromCompany', () => {
      it('should store message from company', async () => {
        applicationRepositoryMock.findOne.mockResolvedValueOnce(
          jobApplicationStub
        )

        await service.sendMessageFromCompany(companyStub, {
          jobId: 1,
          message: 'message'
        })

        expect(messageRepositoryMock.persistAndFlush).toHaveBeenCalled()
      })
    })
  })
})
