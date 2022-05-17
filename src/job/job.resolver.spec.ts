import { Test, TestingModule } from '@nestjs/testing'
import { JobResolver } from './job.resolver'
import { JobService } from './job.service'
import { createMock } from '@golevelup/ts-jest'
import { JobLevel, JobRegiment } from './gql/enum'
import { companyStub } from '../../test/stubs/company.stub'

describe('JobResolver', () => {
  let resolver: JobResolver

  const jobServiceMock = createMock<JobService>({})

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
})
