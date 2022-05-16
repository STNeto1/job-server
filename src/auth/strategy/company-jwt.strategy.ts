import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from '../types/jwt.payload'
import { getRsaPublicKey } from '../../utils'
import { CompanyService } from '../../company/company.service'
import { Company } from '../../company/entities/company.entity'

@Injectable()
export class CompanyJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private companyService: CompanyService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getRsaPublicKey()
    })
  }

  async validate(payload: JwtPayload): Promise<Company> {
    return this.companyService.findOne(payload.sub)
  }
}
