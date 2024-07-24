import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { SkillModule } from './skill/skill.module';
import { AddressModule } from './address/address.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [AuthModule, UserModule, JobModule, SkillModule, AddressModule, CompanyModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    }
  ],
})
export class AppModule {}
