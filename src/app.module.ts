import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { GraphQLModule } from '@nestjs/graphql'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'

import { configValidationSchema } from './configuration/config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module'
import { CompanyModule } from './company/company.module'
import { JobModule } from './job/job.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema
    }),
    LoggerModule.forRoot(),
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      dbName: 'jobs',
      type: 'postgresql',
      user: 'postgres',
      password: 'postgres',
      port: 5432,
      debug: true
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      autoSchemaFile: true
    }),
    UserModule,
    AuthModule,
    MailModule,
    CompanyModule,
    JobModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
