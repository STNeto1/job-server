import { Field, InputType } from '@nestjs/graphql'
import { JobLevel, JobRegiment } from '../gql/enum'
import { IsBoolean, IsEnum, IsNotEmpty, MinLength } from 'class-validator'

@InputType()
export class CreateJobInput {
  @IsNotEmpty()
  @MinLength(8)
  @Field(() => String)
  title: string

  @IsEnum(JobRegiment)
  @Field(() => JobRegiment)
  regiment: JobRegiment

  @IsBoolean()
  @Field(() => Boolean)
  remote: boolean

  @IsEnum(JobLevel)
  @Field(() => JobLevel)
  level: JobLevel

  @IsNotEmpty()
  @Field(() => String)
  salary: string

  @IsNotEmpty()
  @MinLength(10)
  @Field(() => String)
  description: string

  @IsNotEmpty()
  @MinLength(10)
  @Field(() => String)
  requisites: string
}
