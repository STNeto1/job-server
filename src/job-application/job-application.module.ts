import { Module } from '@nestjs/common'
import { JobApplicationService } from './job-application.service'
import { JobApplicationResolver } from './job-application.resolver'

@Module({
  providers: [JobApplicationResolver, JobApplicationService]
})
export class JobApplicationModule {}