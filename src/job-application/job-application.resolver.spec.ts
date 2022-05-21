import { createMock } from '@golevelup/ts-jest'
import { Test, TestingModule } from '@nestjs/testing'
import { JobApplicationResolver } from './job-application.resolver'
import { JobApplicationService } from './job-application.service'

describe('JobApplicationResolver', () => {
  let resolver: JobApplicationResolver

  const applicationServiceMock = createMock<JobApplicationService>()

  beforeEach(async () => {
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
})
