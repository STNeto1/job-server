import { registerEnumType } from '@nestjs/graphql'

export enum CompanyType {
  STARTUP,
  MEDIUM,
  LARGE
}

export enum CompanySize {
  SMALL,
  MEDIUM,
  LARGE
}

registerEnumType(CompanyType, {
  name: 'CompanyType'
})

registerEnumType(CompanySize, {
  name: 'CompanySize'
})
