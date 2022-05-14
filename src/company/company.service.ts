import { BadRequestException, Injectable } from '@nestjs/common'
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
    const existingEmail = await this.companyRepository.findOne({
      email: createCompanyInput.email
    })
    if (existingEmail) {
      throw new BadRequestException('Email already in use')
    }

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

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({})
  }

  findOne(id: number) {
    return `This action returns a #${id} company`
  }

  update(id: number, updateCompanyInput: UpdateCompanyInput) {
    return `This action updates a #${id} company`
  }

  remove(id: number) {
    return `This action removes a #${id} company`
  }
}
