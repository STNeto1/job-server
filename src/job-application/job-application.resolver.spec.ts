import { createMock } from '@golevelup/ts-jest'
import { Test, TestingModule } from '@nestjs/testing'
import { companyStub } from '../../test/stubs/company.stub'
import { jobApplicationStub } from '../../test/stubs/job-application.stub'
import { userStub } from '../../test/stubs/user.stub'
import { JobApplicationResolver } from './job-application.resolver'
import { JobApplicationService } from './job-application.service'

describe('JobApplicationResolver', () => {
  let resolver: JobApplicationResolver

  const applicationServiceMock = createMock<JobApplicationService>({
    findAllUserApplications: jest.fn().mockResolvedValue([jobApplicationStub]),
    findAllCompanyApplications: jest
      .fn()
      .mockResolvedValue([jobApplicationStub])
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobApplicationResolver,
        { provide: JobApplicationService, useValue: applicationServiceMock }
      ]
    }).compile()

    resolver = module.get<JobApplicationResolver>(JobApplicationResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('createJobApplication', () => {
    it('should create a job application', async () => {
      await resolver.createJobApplication(userStub, { jobId: 1 })

      expect(applicationServiceMock.create).toHaveBeenCalled()
    })
  })

  describe('findUserJobApplications', () => {
    it('should find user jobs application', async () => {
      const result = await resolver.findUserJobApplications(userStub)

      expect(result).toEqual([jobApplicationStub])
    })
  })

  describe('findCompanyRelatedJobApplications', () => {
    it('should find company related jobs', async () => {
      const result = await resolver.findCompanyRelatedJobApplications(
        companyStub
      )

      expect(result).toEqual([jobApplicationStub])
    })
  })

  describe('markApplicationAsProcessing', () => {
    it('should mark application as processing', async () => {
      await resolver.markApplicationAsProcessing(companyStub, 1)

      expect(
        applicationServiceMock.markApplicationAsProcessing
      ).toHaveBeenCalled()
    })
  })

  describe('markApplicationAsFinished', () => {
    it('should mark application as finished', async () => {
      await resolver.markApplicationAsFinished(companyStub, 1)

      expect(
        applicationServiceMock.markApplicationAsFinished
      ).toHaveBeenCalled()
    })
  })

  describe('cancelJobApplication', () => {
    it('should cancel job application', async () => {
      await resolver.cancelJobApplication(userStub, 1)

      expect(applicationServiceMock.cancelJobApplication).toHaveBeenCalled()
    })
  })

  describe('giveUpJobApplication', () => {
    it('should give up job application', async () => {
      await resolver.giveUpJobApplication(companyStub, 1)

      expect(applicationServiceMock.giveUpJobApplication).toHaveBeenCalled()
    })
  })

  describe('sendMessageFromUser', () => {
    it('should store message from user', async () => {
      await resolver.sendMessageFromUser(userStub, {
        jobId: 1,
        message: 'any message'
      })

      expect(applicationServiceMock.sendMessageFromUser).toHaveBeenCalled()
    })
  })

  describe('sendMessageFromCompany', () => {
    it('should store message from user', async () => {
      await resolver.sendMessageFromCompany(companyStub, {
        jobId: 1,
        message: 'any message'
      })

      expect(applicationServiceMock.sendMessageFromCompany).toHaveBeenCalled()
    })
  })
})
