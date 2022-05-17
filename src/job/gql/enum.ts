import { registerEnumType } from '@nestjs/graphql'

export enum JobRegiment {
  CLT,
  PJ,
  INTERNSHIP
}

export enum JobLevel {
  JR,
  PL,
  SR
}

registerEnumType(JobRegiment, {
  name: 'JobRegiment'
})

registerEnumType(JobLevel, {
  name: 'JobLevel'
})
