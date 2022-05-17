import { Job } from '../../src/job/entities/job.entity'
import { companyStub } from './company.stub'
import { JobLevel, JobRegiment } from '../../src/job/gql/enum'

export const jobStub: Job = {
  id: 1,
  title: 'some job',
  slug: '1-some-job',
  description: 'some description',
  requisites: 'some requisites',
  salary: 'some salary',
  company: companyStub,
  level: JobLevel.JR,
  regiment: JobRegiment.INTERNSHIP,
  remote: false,
  createdAt: new Date(),
  updatedAt: new Date()
}
