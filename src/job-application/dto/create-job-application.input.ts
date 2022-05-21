import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateJobApplicationInput {
  @Field(() => Int)
  jobId: number
}
