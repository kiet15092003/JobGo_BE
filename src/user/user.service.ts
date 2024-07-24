import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateCandidateDto, CreateRecruiterDto, GetAllCandidateFilterType, GetAllCandidateResponeType, UpdateCandidateDto } from './dto/user.dto';
import { Candidate, Recruiter } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    createCandidate = async (candidateData: CreateCandidateDto): Promise<Candidate> => {
        const existingCandidate = await this.prismaService.candidate.findUnique({
            where: { userId: candidateData.userId }
        });
        if (existingCandidate) {
            throw new HttpException({ message: "Candidate already exists" }, HttpStatus.BAD_REQUEST);
        }
        const res = await this.prismaService.candidate.create({
            data: {
                userId: candidateData.userId,
                yoe: candidateData.yoe ?? null,
                bio: candidateData.bio ?? null,
                perWeb: candidateData.perWeb ?? null,
            }
        });
        return res;
    }

    getAllCandidate = async (filter:GetAllCandidateFilterType): Promise<GetAllCandidateResponeType> => {
        const allCandidateCount = await this.prismaService.candidate.count();
        const itemsPerPage = Number(filter.items_per_page) || allCandidateCount
        const page = Number(filter.page) || 1
        const query = filter.query || ``
        const skip = page > 1 ?  (page-1) * itemsPerPage : 0

        const candiates = await this.prismaService.candidate.findMany({
            take: itemsPerPage,
            skip,
            where: {
                OR: [
                    {
                        user: { name: { contains: query } } 
                    } 
                ], 
                AND: [
                    {

                    }
                ]
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                user: true, 
                //skills: { include: { skill: true } }, 
            },
        })

        const total = await this.prismaService.candidate.count({
            // where: {
            //     OR: [
            //         {
                        
            //         }
            //     ], 
            //     AND: [
            //         {

            //         }
            //     ]
            // },
        })
        return {
            data: candiates,
            total: total,
            currentPage: page,
            itemsPerPage: itemsPerPage
        }
    }

    getDetailCandidate = async (id:number): Promise<Candidate> => {
        return await this.prismaService.candidate.findFirst({
            where: {
                id:id
            }
        })
    }

    updateCandidate = async (id:number, updateData: UpdateCandidateDto): Promise<Candidate> => {
        const candidateUpdate = this.getDetailCandidate(id)
        if (!candidateUpdate){
            throw new HttpException({'message': 'candidate not exist'}, HttpStatus.BAD_REQUEST)
        }
        const skillIds = updateData.skills.map(skill => ({ skillId: skill.id }));
        return await this.prismaService.candidate.update({
            where: {
                id
            }, 
            data: {
                skills: {
                    createMany: {
                        data: skillIds
                    },
                    
                }
            }
        })
    }
    
    createRecruiter = async (recruiterData: CreateRecruiterDto): Promise<Recruiter> => {
        const existingrecruiter = await this.prismaService.recruiter.findUnique({
            where: { userId: recruiterData.userId }
        });
        if (existingrecruiter) {
            throw new HttpException({ message: "recruiter already exists" }, HttpStatus.BAD_REQUEST);
        }
        const res = await this.prismaService.recruiter.create({
            data: {
                userId: recruiterData.userId,
                companyId: recruiterData.companyId
            }
        });
        return res;
    }

}
