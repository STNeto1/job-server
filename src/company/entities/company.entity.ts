import {
  Collection,
  Entity,
  Enum,
  IntegerType,
  OneToMany,
  PrimaryKey,
  Property,
  StringType,
  TextType
} from '@mikro-orm/core'
import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { CompanyType } from '../gql/enum'
import { Job } from '../../job/entities/job.entity'

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

  @Property({ type: StringType })
  @Field(() => String)
  name: string

  @Property({
    unique: true,
    type: StringType
  })
  @Field(() => String)
  email: string

  @Property({ type: StringType })
  @HideField()
  password: string

  @Property({ nullable: true, type: StringType })
  @Field(() => String, { nullable: true })
  logo?: string

  @Enum({ items: () => CompanyType, type: IntegerType })
  @Field(() => CompanyType)
  type: CompanyType

  @Property({ type: TextType })
  @Field(() => String)
  description: string

  @Property({ type: StringType })
  @Field(() => String)
  city: string

  @Property({ type: StringType })
  @Field(() => String)
  state: string

  @OneToMany(() => Job, (model) => model.company)
  @Field(() => [Job])
  jobs = new Collection<Job>(this)

  @Property()
  @Field(() => Date)
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  @Field(() => Date)
  updatedAt: Date = new Date()

  @Property({ nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt?: Date
}
