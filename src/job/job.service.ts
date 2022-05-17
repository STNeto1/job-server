import { Injectable } from '@nestjs/common'
import { CreateJobInput } from './dto/create-job.input'
import { UpdateJobInput } from './dto/update-job.input'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Job } from './entities/job.entity'
import { EntityRepository } from '@mikro-orm/core'
import { Company } from '../company/entities/company.entity'

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private jobRepository: EntityRepository<Job>
  ) {}

  async create(
    company: Company,
    createJobInput: CreateJobInput
  ): Promise<void> {
    const job = this.jobRepository.create({
      company,
      title: createJobInput.title,
      regiment: createJobInput.regiment,
      level: createJobInput.level,
      remote: createJobInput.remote,
      salary: createJobInput.salary,
      description: createJobInput.description,
      requisites: createJobInput.requisites
    })

    await this.jobRepository.persistAndFlush(job)
  }

  findAll() {
    return `This action returns all job`
  }

  findOne(id: number) {
    return `This action returns a #${id} job`
  }

  update(id: number, updateJobInput: UpdateJobInput) {
    return `This action updates a #${id} job`
  }

  remove(id: number) {
    return `This action removes a #${id} job`
  }
}
