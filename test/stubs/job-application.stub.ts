import { Loaded } from '@mikro-orm/core'
import { JobApplication } from '../../src/job-application/entities/job-application.entity'
import { ApplicationStatus } from '../../src/job-application/gql/enum'
import { jobStub } from './job.stub'
import { userStub } from './user.stub'

export const jobApplicationStub: Loaded<JobApplication, string> = {
  id: 1,
  job: jobStub,
  user: userStub,
  status: ApplicationStatus.OPEN,
  createdAt: new Date(),
  updatedAt: new Date()
}
