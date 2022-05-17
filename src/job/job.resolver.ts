import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { JobService } from './job.service'
import { Job } from './entities/job.entity'
import { CreateJobInput } from './dto/create-job.input'
import { UpdateJobInput } from './dto/update-job.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guard/gql.guard'
import { Company } from '../company/entities/company.entity'
import { CurrentCompany } from '../auth/decorators/current-company'
import { PaginationArgs } from '../gql/args/pagination.args'

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
  async findAll(
    @Args('pagination') pagination: PaginationArgs
  ): Promise<Job[]> {
    return this.jobService.findAll(pagination)
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

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateJob(
    @CurrentCompany() company: Company,
    @Args('updateJobInput') updateJobInput: UpdateJobInput
  ): Promise<boolean> {
    await this.jobService.update(company, updateJobInput)
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeJob(
    @CurrentCompany() company: Company,
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    await this.jobService.remove(company, id)
    return true
  }
}
