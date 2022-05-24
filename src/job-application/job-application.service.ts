import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Company } from '../company/entities/company.entity'
import { JobService } from '../job/job.service'
import { User } from '../user/entities/user.entity'
import { CreateJobApplicationInput } from './dto/create-job-application.input'
import { JobApplication } from './entities/job-application.entity'
import { ApplicationStatus } from './gql/enum'

@Injectable()
export class JobApplicationService {
  constructor(
    @InjectRepository(JobApplication)
    private applicationRepository: EntityRepository<JobApplication>,
    private jobService: JobService
  ) {}

  async create(
    user: User,
    createJobApplicationInput: CreateJobApplicationInput
  ): Promise<void> {
    const job = await this.jobService.findOne(createJobApplicationInput.jobId)

    const applicationExists = await this.applicationRepository.findOne({
      user,
      job
    })

    if (applicationExists) {
      throw new BadRequestException('Application already exists')
    }

    const newApplication = this.applicationRepository.create({
      user,
      job
    })

    await this.applicationRepository.persistAndFlush(newApplication)
  }

  async findAll(): Promise<JobApplication[]> {
    return this.applicationRepository.find({})
  }

  async findAllUserApplications(user: User): Promise<JobApplication[]> {
    return this.applicationRepository.find({
      user
    })
  }

  async findAllCompanyApplications(
    company: Company
  ): Promise<JobApplication[]> {
    return this.applicationRepository.find({
      job: {
        company
      }
    })
  }

  async findUserApplication(user: User, id: number): Promise<JobApplication> {
    const application = await this.applicationRepository.findOne({
      user,
      id
    })

    if (!application) {
      throw new BadRequestException('Resource was not found')
    }

    return application
  }

  async findCompanyApplication(
    company: Company,
    id: number
  ): Promise<JobApplication> {
    const application = await this.applicationRepository.findOne({
      id,
      job: {
        company
      }
    })

    if (!application) {
      throw new BadRequestException('Resource was not found')
    }

    return application
  }

  async markApplicationAsProcessing(
    company: Company,
    id: number
  ): Promise<void> {
    const application = await this.findCompanyApplication(company, id)

    if (application.status !== ApplicationStatus.OPEN) {
      throw new BadRequestException('Only open application can be processed')
    }

    application.status = ApplicationStatus.PROCESSING
    // TODO send email to user

    await this.applicationRepository.persistAndFlush(application)
  }

  async markApplicationAsFinished(company: Company, id: number): Promise<void> {
    const application = await this.findCompanyApplication(company, id)

    if (application.status !== ApplicationStatus.PROCESSING) {
      throw new BadRequestException(
        'Only processing application can be finished'
      )
    }

    application.status = ApplicationStatus.FINISHED
    // TODO send email to user

    await this.applicationRepository.persistAndFlush(application)
  }

  async cancelJobApplication(user: User, id: number): Promise<void> {
    const application = await this.findUserApplication(user, id)

    if (application.status !== ApplicationStatus.OPEN) {
      throw new BadRequestException('Only open application can be cancelled')
    }

    application.status = ApplicationStatus.CANCELLED
    // TODO send email to company

    await this.applicationRepository.persistAndFlush(application)
  }

  async giveUpJobApplication(company: Company, id: number): Promise<void> {
    const application = await this.findCompanyApplication(company, id)

    if (
      application.status !== ApplicationStatus.PROCESSING &&
      application.status !== ApplicationStatus.OPEN
    ) {
      throw new BadRequestException(
        'Only open or processing applications can be given up'
      )
    }

    application.status = ApplicationStatus.GIVEN_UP
    // TODO send email to user

    await this.applicationRepository.persistAndFlush(application)
  }
}
