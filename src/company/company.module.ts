import { Module } from '@nestjs/common'
import { CompanyService } from './company.service'
import { CompanyResolver } from './company.resolver'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Company } from './entities/company.entity'

@Module({
  imports: [MikroOrmModule.forFeature([Company])],
  providers: [CompanyResolver, CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
