import { Company } from '../../src/company/entities/company.entity'
import { CompanyType } from '../../src/company/gql/enum'

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
  createdAt: new Date(),
  updatedAt: new Date()
}
