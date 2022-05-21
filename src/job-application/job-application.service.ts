import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BadRequestException, Injectable } from '@nestjs/common'
import { Company } from '../company/entities/company.entity'
import { JobService } from '../job/job.service'
import { User } from '../user/entities/user.entity'
import { CreateJobApplicationInput } from './dto/create-job-application.input'
import { UpdateJobApplicationInput } from './dto/update-job-application.input'
import { JobApplication } from './entities/job-application.entity'

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

  update(id: number, updateJobApplicationInput: UpdateJobApplicationInput) {
    return `This action updates a #${id} jobApplication`
  }

  remove(id: number) {
    return `This action removes a #${id} jobApplication`
  }
}
