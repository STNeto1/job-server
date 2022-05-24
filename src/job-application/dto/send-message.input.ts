import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNumber, MinLength } from 'class-validator'

@InputType()
export class SendMessageInput {
  @IsNumber()
  @Field(() => Int)
  jobId: number

  @MinLength(1)
  @Field(() => String)
  message: string
}
