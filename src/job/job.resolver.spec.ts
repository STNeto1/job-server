import { Test, TestingModule } from '@nestjs/testing'
import { JobResolver } from './job.resolver'
import { JobService } from './job.service'
import { createMock } from '@golevelup/ts-jest'

describe('JobResolver', () => {
  let resolver: JobResolver

  const jobServiceMock = createMock<JobService>()

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
})