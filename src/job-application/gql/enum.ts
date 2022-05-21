import { registerEnumType } from '@nestjs/graphql'

export enum ApplicationStatus {
  OPEN,
  FINISHED,
  CANCELLED,
  GIVEN_UP
}

registerEnumType(ApplicationStatus, {
  name: 'ApplicationStatus'
})
