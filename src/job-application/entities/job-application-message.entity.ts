import {
  BooleanType,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  TextType
} from '@mikro-orm/core'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { JobApplication } from './job-application.entity'

@ObjectType()
@Entity({
  tableName: 'job_application_messages'
})
export class JobApplicationMessage {
  @PrimaryKey({
    autoincrement: true
  })
  @Field(() => Int)
  id: number

  @ManyToOne(() => JobApplication)
  @Field(() => JobApplication)
  application: JobApplication

  @Property({ type: TextType })
  @Field(() => String)
  message: string

  @Property({ type: BooleanType })
  @Field(() => Boolean)
  from_user: boolean

  @Property()
  @Field(() => Date)
  createdAt: Date = new Date()
}
