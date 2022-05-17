import { Field, ObjectType } from '@nestjs/graphql'
import {
  BooleanType,
  Entity,
  Enum,
  IntegerType,
  ManyToOne,
  PrimaryKey,
  Property,
  StringType,
  TextType
} from '@mikro-orm/core'
import { JobLevel, JobRegiment } from '../gql/enum'
import { Company } from '../../company/entities/company.entity'

@ObjectType()
@Entity({
  tableName: 'jobs'
})
export class Job {
  @PrimaryKey({
    autoincrement: true,
    type: Number
  })
  @Field(() => Number)
  id: number

  @ManyToOne(() => Company)
  @Field(() => Company)
  company: Company

  @Property({ type: StringType })
  @Field(() => String)
  title: string

  @Property({ type: StringType })
  @Field(() => String)
  slug: string

  @Enum({ items: () => JobRegiment, type: IntegerType })
  @Field(() => JobRegiment)
  regiment: JobRegiment

  @Property({ type: BooleanType })
  @Field(() => Boolean)
  remote: boolean

  @Enum({ items: () => JobLevel, type: IntegerType })
  @Field(() => JobLevel)
  level: JobLevel

  @Property({ type: StringType })
  @Field(() => String)
  salary: string

  @Property({ type: TextType })
  @Field(() => String)
  description: string

  @Property({ type: TextType })
  @Field(() => String)
  requisites: string

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
