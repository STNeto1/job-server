import { Field, HideField, ObjectType } from '@nestjs/graphql'
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property
} from '@mikro-orm/core'
import { JobApplication } from '../../job-application/entities/job-application.entity'

@ObjectType()
@Entity({
  tableName: 'users'
})
export class User {
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

  @Property({})
  @Field(() => String)
  phone: string

  @Property({ nullable: true })
  @Field(() => String, { nullable: true })
  resume?: string

  @OneToMany(() => JobApplication, (model) => model.user)
  @Field(() => [JobApplication])
  applications = new Collection<JobApplication>(this)

  @Property()
  @Field(() => Date)
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  @Field(() => Date)
  updatedAt: Date = new Date()
}
