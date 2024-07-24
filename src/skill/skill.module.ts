import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [SkillController],
  providers: [SkillService, PrismaService]
})
export class SkillModule {}
