import {
  Entity,
  Enum,
  IntegerType,
  ManyToOne,
  PrimaryKey,
  Property
} from '@mikro-orm/core'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Job } from '../../job/entities/job.entity'
import { User } from '../../user/entities/user.entity'
import { ApplicationStatus } from '../gql/enum'

@ObjectType()
@Entity({
  tableName: 'job_applications'
})
export class JobApplication {
  @PrimaryKey({
    autoincrement: true
  })
  @Field(() => Int)
  id: number

  @ManyToOne(() => User)
  @Field(() => User)
  user: User

  @ManyToOne(() => Job)
  @Field(() => Job)
  job: Job

  @Enum({
    items: () => ApplicationStatus,
    type: IntegerType,
    default: ApplicationStatus.OPEN
  })
  @Field(() => ApplicationStatus)
  status: ApplicationStatus = ApplicationStatus.OPEN

  @Property()
  @Field(() => Date)
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  @Field(() => Date)
  updatedAt: Date = new Date()
}
