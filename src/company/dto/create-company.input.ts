import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator'
import { CompanySize, CompanyType } from '../gql/enum'

@InputType()
export class CreateCompanyInput {
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string

  @IsNotEmpty()
  @MinLength(4)
  @Field(() => String)
  password: string

  @IsEnum(CompanyType)
  @Field(() => CompanyType)
  type: CompanyType

  @IsEnum(CompanySize)
  @Field(() => CompanySize)
  size: CompanySize

  @IsNotEmpty()
  @Field(() => String)
  description: string

  @IsNotEmpty()
  @Field(() => String)
  city: string

  @IsNotEmpty()
  @Field(() => String)
  state: string
}
