import { CreateJobInput } from './create-job.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsPositive,
  MinLength
} from 'class-validator'
import { JobLevel, JobRegiment } from '../gql/enum'

@InputType()
export class UpdateJobInput extends PartialType(CreateJobInput) {
  @IsPositive()
  @Field(() => Int)
  id: number

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
