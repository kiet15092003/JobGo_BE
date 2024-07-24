import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [JobController],
  providers: [JobService, PrismaService]
})
export class JobModule {}
