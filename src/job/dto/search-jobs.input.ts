import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { PaginationArgs } from '../../gql/args/pagination.args'
import { JobLevel, JobRegiment } from '../gql/enum'

@InputType()
export class SearchJobsInput extends PaginationArgs {
  @IsNotEmpty()
  @Field(() => String)
  term: string

  @IsOptional()
  @IsEnum(JobRegiment)
  @Field(() => JobRegiment, { nullable: true })
  regiment?: JobRegiment

  @IsOptional()
  @IsEnum(JobLevel)
  @Field(() => JobLevel, { nullable: true })
  level?: JobLevel

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  remote?: boolean
}
