import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/core'

import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-company.input'
import { Company } from './entities/company.entity'
import { hash } from 'argon2'

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: EntityRepository<Company>
  ) {}

  async create(createCompanyInput: CreateCompanyInput): Promise<void> {
    await this.checkEmailUsage(createCompanyInput.email)

    const company = this.companyRepository.create({
      name: createCompanyInput.name,
      email: createCompanyInput.email,
      password: await hash(createCompanyInput.password),
      description: createCompanyInput.description,
      type: createCompanyInput.type,
      city: createCompanyInput.city,
      state: createCompanyInput.state
    })

    await this.companyRepository.persistAndFlush(company)
  }

  private async checkEmailUsage(email: string) {
    const existingEmail = await this.companyRepository.findOne({
      email
    })
    if (existingEmail) {
      throw new BadRequestException('Email already in use')
    }
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({})
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      id,
      deletedAt: { $eq: null }
    })

    if (!company) throw new NotFoundException('Resource not found')

    return company
  }

  async update(
    company: Company,
    updateCompanyInput: UpdateCompanyInput
  ): Promise<void> {
    if (updateCompanyInput.email) {
      await this.checkEmailUsage(updateCompanyInput.email)
    }

    for (const key of Object.keys(updateCompanyInput)) {
      company[key] = updateCompanyInput[key]
    }

    if (updateCompanyInput.password) {
      company.password = await hash(updateCompanyInput.password)
    }

    await this.companyRepository.persistAndFlush(company)
  }

  async remove(company: Company): Promise<void> {
    company.deletedAt = new Date()

    await this.companyRepository.persistAndFlush(company)
  }
}
