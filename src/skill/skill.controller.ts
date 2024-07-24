import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SkillService } from './skill.service';
import { createSkillDto, GetAllSkillFilterDto, GetAllSkillResponeDto } from './dto/skill.dto';
import { Skill } from '@prisma/client';

@Controller('skill')
export class SkillController {
    constructor(private skillService: SkillService){}

    @Post('/create')
    createSkill(@Body() body: createSkillDto): Promise<Skill> {
        return this.skillService.createSkill(body)
    }

    @Get('/getAll')
    getAllSkill(@Query() param: GetAllSkillFilterDto): Promise<GetAllSkillResponeDto>{
        return this.skillService.getAllSkill(param);
    }
}