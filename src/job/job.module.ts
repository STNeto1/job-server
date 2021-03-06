import { Module } from '@nestjs/common'
import { JobService } from './job.service'
import { JobResolver } from './job.resolver'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Job } from './entities/job.entity'

@Module({
  imports: [MikroOrmModule.forFeature([Job])],
  providers: [JobResolver, JobService]
})
export class JobModule {}
