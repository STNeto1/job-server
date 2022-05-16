import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { LoginInput } from '../user/dto/login.input'
import { User } from '../user/entities/user.entity'
import { JwtReturn } from './types/jwt.return'
import { CompanyLoginInput } from '../company/dto/company-login.input'
import { CompanyService } from '../company/company.service'
import { Company } from '../company/entities/company.entity'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private companyService: CompanyService
  ) {}

  async validateUser(data: LoginInput): Promise<JwtReturn> {
    const user = await this.userService.findByEmailAndPassword(data)

    return this.generateToken(user)
  }

  async validateCompany(data: CompanyLoginInput): Promise<JwtReturn> {
    const company = await this.companyService.findWithCredentials(data)

    return this.generateToken(company)
  }

  generateToken(entity: User | Company): JwtReturn {
    const payload = {
      sub: entity.id
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
