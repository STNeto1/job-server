import { Field, InputType } from '@nestjs/graphql'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength
} from 'class-validator'
import { CompanyType } from '../gql/enum'

@InputType()
export class UpdateCompanyInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string

  @IsNotEmpty()
  @MinLength(4)
  @Field(() => String, { nullable: true })
  password?: string

  @IsEnum(CompanyType)
  @Field(() => CompanyType, { nullable: true })
  type?: CompanyType

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  description?: string

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  city?: string

  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  state?: string
}
