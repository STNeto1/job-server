import { registerEnumType } from '@nestjs/graphql'

export enum CompanyType {
  STARTUP,
  MEDIUM,
  LARGE
}

registerEnumType(CompanyType, {
  name: 'CompanyType'
})
