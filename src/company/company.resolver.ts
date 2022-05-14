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
  findAll() {
    return this.companyService.findAll()
  }

  @Query(() => Company, { name: 'findOneCompany' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.companyService.findOne(id)
  }

  @Mutation(() => Company)
  updateCompany(
    company: Company,
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput
  ) {
    return this.companyService.update(company, updateCompanyInput)
  }

  @Mutation(() => Company)
  removeCompany(company: Company) {
    return this.companyService.remove(company)
  }
}
