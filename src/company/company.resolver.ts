import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CompanyService } from './company.service'
import { Company } from './entities/company.entity'
import { CreateCompanyInput } from './dto/create-company.input'
import { UpdateCompanyInput } from './dto/update-company.input'

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Boolean)
  async createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput
  ): Promise<boolean> {
    await this.companyService.create(createCompanyInput)
    return true
  }

  @Query(() => [Company], { name: 'findAllCompanies' })
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll()
  }

  @Query(() => Company, { name: 'findOneCompany' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Company> {
    return this.companyService.findOne(id)
  }

  @Mutation(() => Boolean)
  async updateCompany(
    company: Company,
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput
  ): Promise<boolean> {
    await this.companyService.update(company, updateCompanyInput)
    return true
  }

  @Mutation(() => Boolean)
  async removeCompany(company: Company): Promise<boolean> {
    await this.companyService.remove(company)
    return true
  }
}
