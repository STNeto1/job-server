import { Injectable } from '@nestjs/common'
import { CreateJobApplicationInput } from './dto/create-job-application.input'
import { UpdateJobApplicationInput } from './dto/update-job-application.input'

@Injectable()
export class JobApplicationService {
  create(createJobApplicationInput: CreateJobApplicationInput) {
    return 'This action adds a new jobApplication'
  }

  findAll() {
    return `This action returns all jobApplication`
  }

  findOne(id: number) {
    return `This action returns a #${id} jobApplication`
  }

  update(id: number, updateJobApplicationInput: UpdateJobApplicationInput) {
    return `This action updates a #${id} jobApplication`
  }

  remove(id: number) {
    return `This action removes a #${id} jobApplication`
  }
}
