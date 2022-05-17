import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { JobService } from './job.service'
import { Job } from './entities/job.entity'
import { CreateJobInput } from './dto/create-job.input'
import { UpdateJobInput } from './dto/update-job.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guard/gql.guard'
import { Company } from '../company/entities/company.entity'
import { CurrentCompany } from '../auth/decorators/current-company'

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async createJob(
    @CurrentCompany() company: Company,
    @Args('createJobInput') createJobInput: CreateJobInput
  ): Promise<boolean> {
    await this.jobService.create(company, createJobInput)
    return true
  }

  @Query(() => [Job], { name: 'findAllJobs' })
  async findAll(): Promise<Job[]> {
    return this.jobService.findAll()
  }

  @Query(() => Job, { name: 'findOneJob' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Job> {
    return this.jobService.findOne(id)
  }

  @Query(() => Job, { name: 'findOneJobBySlug' })
  async findOneBySlug(
    @Args('slug', { type: () => String }) slug: string
  ): Promise<Job> {
    return this.jobService.findOneBySlug(slug)
  }

  @Mutation(() => Job)
  updateJob(@Args('updateJobInput') updateJobInput: UpdateJobInput) {
    return this.jobService.update(updateJobInput.id, updateJobInput)
  }

  @Mutation(() => Job)
  removeJob(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.remove(id)
  }
}
