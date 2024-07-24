import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateJobDto } from './dto/job.dto';
import { Job } from '@prisma/client';

@Injectable()
export class JobService {
    constructor(private prismaService: PrismaService){}
    createJob = async (body:CreateJobDto) : Promise<Job> => {
        try {
            const res = await this.prismaService.job.create({
                data: {
                    title: body.title,
                    description: body.description,
                    salary: body.salary,
                    minYOE: body.minYOE,
                    addressId: body.addressId,
                    recruiterId: body.recruiterId,
                    skills: {
                        create: body.skills.map(skillId => ({
                            skill: {
                                connect: {id:skillId}
                            }
                        }))
                    }
                }
            }) 
            return res
        } catch (error) {
            throw new HttpException({'message': {error}},HttpStatus.BAD_REQUEST)
        }
        
    }
}
