import { Company } from '../../src/company/entities/company.entity'
import { CompanyType } from '../../src/company/gql/enum'
import { Job } from '../../src/job/entities/job.entity'
import { Collection } from '@mikro-orm/core'

export const companyStub: Company = {
  id: 1,
  name: 'some company',
  email: 'company@company.com',
  password: '102030',
  description: 'some description',
  logo: 'some logo',
  city: 'CG',
  state: 'PB',
  type: CompanyType.STARTUP,
  jobs: new Collection<Job, unknown>(this, []),
  createdAt: new Date(),
  updatedAt: new Date()
}
