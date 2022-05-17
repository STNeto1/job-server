import { Field } from '@nestjs/graphql'
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { JobLevel, JobRegiment } from '../gql/enum'

export class SearchJobsInput {
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
