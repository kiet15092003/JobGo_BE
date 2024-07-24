import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CompanyCreateDto } from './dto/company.dto';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {
    constructor(private prismaService: PrismaService){}

    createCompany = async (companyData : CompanyCreateDto) : Promise<Company> => {
        try {
            const res = await this.prismaService.company.create({
                data: {
                    name : companyData.name,
                    description: companyData.description,
                    websiteURL: companyData.websiteURL,
                    address: {
                        connect: companyData.addressIds.map((addressId) => ({
                            id: addressId,
                        })),
                    },
                }
            });
            return res
        } catch (error) {
            throw new HttpException({'message':{error}}, HttpStatus.BAD_REQUEST)
        }     
    }
}