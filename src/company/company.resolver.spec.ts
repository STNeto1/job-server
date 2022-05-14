import { Test, TestingModule } from '@nestjs/testing'
import { CompanyResolver } from './company.resolver'
import { CompanyService } from './company.service'
import { createMock } from '@golevelup/ts-jest'

describe('CompanyResolver', () => {
  let resolver: CompanyResolver

  const companyServiceMock = createMock<CompanyService>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyResolver,
        { provide: CompanyService, useValue: companyServiceMock }
      ]
    }).compile()

    resolver = module.get<CompanyResolver>(CompanyResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
