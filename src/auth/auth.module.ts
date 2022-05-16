import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { JwtStrategy } from './strategy/jwt.strategy'
import { AuthResolver } from './auth.resolver'
import { getRsaPrivateKey } from '../utils'
import { CompanyModule } from '../company/company.module'
import { CompanyJwtStrategy } from './strategy/company-jwt.strategy'

@Module({
  imports: [
    UserModule,
    CompanyModule,
    PassportModule,
    JwtModule.register({
      secret: getRsaPrivateKey(),
      signOptions: {
        expiresIn: '1h',
        algorithm: 'RS256'
      }
    })
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, CompanyJwtStrategy]
})
export class AuthModule {}
