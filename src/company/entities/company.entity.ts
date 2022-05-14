import { Entity, Enum, PrimaryKey, Property, TextType } from '@mikro-orm/core'
import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { CompanyType } from '../gql/enum'

@Entity({
  tableName: 'companies'
})
@ObjectType()
export class Company {
  @PrimaryKey({
    autoincrement: true,
    type: Number
  })
  @Field(() => Number)
  id: number

  @Property()
  @Field(() => String)
  name: string

  @Property({
    unique: true
  })
  @Field(() => String)
  email: string

  @Property({})
  @HideField()
  password: string

  @Property({ nullable: true })
  @Field(() => String, { nullable: true })
  logo?: string

  @Enum(() => CompanyType)
  @Field(() => CompanyType)
  type: CompanyType

  @Property({ type: TextType })
  @Field(() => String)
  description: string

  @Property({})
  @Field(() => String)
  city: string

  @Property({})
  @Field(() => String)
  state: string

  @Property()
  @Field(() => Date)
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  @Field(() => Date)
  updatedAt: Date = new Date()
}
