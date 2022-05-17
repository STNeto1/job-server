import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateJobInput } from './dto/create-job.input'
import { UpdateJobInput } from './dto/update-job.input'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Job } from './entities/job.entity'
import { EntityRepository } from '@mikro-orm/core'
import { Company } from '../company/entities/company.entity'
import slugify from 'slugify'

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private jobRepository: EntityRepository<Job>
  ) {}

  async create(
    company: Company,
    createJobInput: CreateJobInput
  ): Promise<void> {
    const count = await this.jobRepository.count()

    const job = this.jobRepository.create({
      company,
      title: createJobInput.title,
      slug: slugify(`${count + 1} ${createJobInput.title}`, { lower: true }),
      regiment: createJobInput.regiment,
      level: createJobInput.level,
      remote: createJobInput.remote,
      salary: createJobInput.salary,
      description: createJobInput.description,
      requisites: createJobInput.requisites
    })

    await this.jobRepository.persistAndFlush(job)
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find({
      deletedAt: null
    })
  }

  async findOne(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({ id, deletedAt: null })

    if (!job) {
      throw new NotFoundException('Resource was not found')
    }

    return job
  }

  async update(
    company: Company,
    updateJobInput: UpdateJobInput
  ): Promise<void> {
    const job = await this.jobRepository.findOne({
      id: updateJobInput.id,
      deletedAt: null,
      company
    })

    if (!job) {
      throw new NotFoundException('Resource was not found')
    }

    for (const key of Object.keys(updateJobInput)) {
      job[key] = updateJobInput[key]
    }

    if (job.title !== updateJobInput.title) {
      job.slug = slugify(`${job.id} ${updateJobInput.title}`, { lower: true })
    }

    await this.jobRepository.persistAndFlush(job)
  }

  async remove(company: Company, id: number): Promise<void> {
    const job = await this.jobRepository.findOne({
      id,
      deletedAt: null,
      company
    })

    if (!job) {
      throw new NotFoundException('Resource was not found')
    }

    job.deletedAt = new Date()
    await this.jobRepository.persistAndFlush(job)
  }
}
