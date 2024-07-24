import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { createSkillDto, GetAllSkillFilterDto, GetAllSkillResponeDto } from './dto/skill.dto';
import { Skill } from '@prisma/client';

@Injectable()
export class SkillService {
    constructor(private prismaService : PrismaService){}

    createSkill = async (skillData:createSkillDto) : Promise<Skill> => {
        const existingSkillData = await this.prismaService.skill.findUnique({
            where: {
                name: skillData.name
            }
        })
        if (existingSkillData){
            throw new HttpException({'message': 'skill already exist'}, HttpStatus.BAD_REQUEST)
        }
        const res = await this.prismaService.skill.create({
            data: {
                name: skillData.name
            }
        })
        return res
    }

    getAllSkill = async (filter: GetAllSkillFilterDto) : Promise<GetAllSkillResponeDto> => {
        const allSkillCount = await this.prismaService.skill.count()
        const itemsPerPage = Number(filter.items_per_page) || allSkillCount
        const page = Number(filter.page) || 1
        const query = filter.query  || ``
        const skip = page > 1 ?  (page-1) * itemsPerPage : 0

        const skills = await this.prismaService.skill.findMany({
            take: itemsPerPage,
            skip,
            where: {
                OR: [{name :{contains: query}}]
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                jobs: true,
                candidates: true
            }
        })
        const total = await this.prismaService.skill.count({
            take: itemsPerPage,
            skip,
            where: {
                OR: [{name:{contains: query}}]
            },
        })
        return {
            data: skills,
            total: total,
            currentPage: page,
            itemsPerPage: itemsPerPage
        }
    }
}