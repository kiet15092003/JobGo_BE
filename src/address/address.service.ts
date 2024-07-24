import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateAddressDto, GetAllAddressFilterDto, GetAllAddressResponeDto } from './dto/address.dto';
import { Address } from '@prisma/client';

@Injectable()
export class AddressService {
    constructor(private prismaService: PrismaService){}
    
    createAddress = async (addressData: CreateAddressDto) : Promise<Address> => {
        const existingAddress = await this.prismaService.address.findFirst({
            where: {
                name: addressData.name,
                country: addressData.country,
                city: addressData.city,
                district: addressData.district
            }
        })
        if (existingAddress){
            throw new HttpException({'messgae': 'address already exist'}, HttpStatus.BAD_REQUEST)
        }
        const res = await this.prismaService.address.create({
            data:{
                name: addressData.name,
                country: addressData.country,
                city: addressData.city,
                district: addressData.district
            }
        })
        return res
    }

    getAllAddress = async (filter:GetAllAddressFilterDto) : Promise<GetAllAddressResponeDto> => {
        const allAddressCount = await this.prismaService.address.count()
        const itemsPerPage = Number(filter.items_per_page) || allAddressCount
        const page = Number(filter.page) || 1
        const query = filter.query  || ``
        const skip = page > 1 ?  (page-1) * itemsPerPage : 0
        if (filter.isDistinctCity){
            const address = await this.prismaService.address.findMany({
                distinct: ['city'],
                take: itemsPerPage,
                skip,
                where: {
                    OR: [{city: {contains: query}}]
                },
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    jobs: true,
                    copmpany: true
                }
            })
    
            const total = await this.prismaService.address.count({
                take: itemsPerPage,
                skip,
                where: {
                    OR: [{city: {contains: query}}]
                },
            })
    
            return {
                data: address,
                total: total,
                currentPage: page,
                itemsPerPage: itemsPerPage
            }
        }
        const address = await this.prismaService.address.findMany({
            take: itemsPerPage,
            skip,
            where: {
                OR: [{city: {contains: query}}]
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                jobs: true,
                copmpany: true
            }
        })

        const total = await this.prismaService.address.count({
            take: itemsPerPage,
            skip,
            where: {
                OR: [{city: {contains: query}}]
            },
        })

        return {
            data: address,
            total: total,
            currentPage: page,
            itemsPerPage: itemsPerPage
        }
    }
}   