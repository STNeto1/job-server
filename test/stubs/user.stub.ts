import { User } from '../../src/user/entities/user.entity'

export const userStub: User = {
  id: 1,
  name: 'user',
  email: 'mail@mail.com',
  password: 'password',
  createdAt: new Date(),
  updatedAt: new Date(),
  phone: ''
}
