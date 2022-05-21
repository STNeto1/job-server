import { Options } from '@mikro-orm/core'
import { Company } from './company/entities/company.entity'
import { JobApplication } from './job-application/entities/job-application.entity'
import { Job } from './job/entities/job.entity'
import { User } from './user/entities/user.entity'

const config: Options = {
  entities: [User, Company, Job, JobApplication],
  dbName: 'jobs',
  user: 'postgres',
  password: 'postgres',
  type: 'postgresql',
  port: 5432,
  debug: true,
  allowGlobalContext: true
}

export default config
