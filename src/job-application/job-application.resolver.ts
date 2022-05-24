import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { JobApplicationService } from './job-application.service'
import { JobApplication } from './entities/job-application.entity'
import { CreateJobApplicationInput } from './dto/create-job-application.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guard/gql.guard'
import { CurrentUser } from '../auth/decorators/current-user'
import { User } from '../user/entities/user.entity'
import { CurrentCompany } from '../auth/decorators/current-company'
import { Company } from '../company/entities/company.entity'

@Resolver(() => JobApplication)
@UseGuards(GqlAuthGuard)
export class JobApplicationResolver {
  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Mutation(() => Boolean)
  async createJobApplication(
    @CurrentUser() user: User,
    @Args('createJobApplicationInput')
    createJobApplicationInput: CreateJobApplicationInput
  ): Promise<boolean> {
    await this.jobApplicationService.create(user, createJobApplicationInput)
    return true
  }

  @Query(() => [JobApplication], { name: 'findUserJobApplications' })
  async findUserJobApplications(
    @CurrentUser() user: User
  ): Promise<JobApplication[]> {
    return this.jobApplicationService.findAllUserApplications(user)
  }

  @Query(() => [JobApplication], { name: 'findCompanyRelatedJobApplications' })
  async findCompanyRelatedJobApplications(
    @CurrentCompany() company: Company
  ): Promise<JobApplication[]> {
    return this.jobApplicationService.findAllCompanyApplications(company)
  }

  @Mutation(() => Boolean, { name: 'markApplicationAsProcessing' })
  async markApplicationAsProcessing(
    @CurrentCompany() company: Company,
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    await this.jobApplicationService.markApplicationAsProcessing(company, id)
    return true
  }

  @Mutation(() => Boolean, { name: 'markApplicationAsFinished' })
  async markApplicationAsFinished(
    @CurrentCompany() company: Company,
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    await this.jobApplicationService.markApplicationAsFinished(company, id)
    return true
  }

  @Mutation(() => Boolean, { name: 'cancelJobApplication' })
  async cancelJobApplication(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    await this.jobApplicationService.cancelJobApplication(user, id)
    return true
  }

  @Mutation(() => Boolean, { name: 'giveUpJobApplication' })
  async giveUpJobApplication(
    @CurrentCompany() company: Company,
    @Args('id', { type: () => Int }) id: number
  ): Promise<boolean> {
    await this.jobApplicationService.giveUpJobApplication(company, id)
    return true
  }
}
