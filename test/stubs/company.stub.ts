import { Loaded } from '@mikro-orm/core'
import { Company } from '../../src/company/entities/company.entity'
import { CompanyType } from '../../src/company/gql/enum'

export const companyStub: Loaded<Company, string> = {
  id: 1,
  name: 'some company',
  email: 'company@company.com',
  password: '102030',
  description: 'some description',
  logo: 'some logo',
  city: 'CG',
  state: 'PB',
  type: CompanyType.STARTUP,
  jobs: undefined,
  createdAt: new Date(),
  updatedAt: new Date()
}
