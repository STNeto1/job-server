import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { JobModule } from '../job/job.module'
import { JobApplication } from './entities/job-application.entity'
import { JobApplicationResolver } from './job-application.resolver'
import { JobApplicationService } from './job-application.service'

@Module({
  imports: [MikroOrmModule.forFeature([JobApplication]), JobModule],
  providers: [JobApplicationResolver, JobApplicationService]
})
export class JobApplicationModule {}
