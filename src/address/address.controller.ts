import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto, GetAllAddressFilterDto, GetAllAddressResponeDto } from './dto/address.dto';
import { Address } from '@prisma/client';

@Controller('address')
export class AddressController {
    constructor(private addressSerivce: AddressService){}
    
    @Post('/create')
    createAddress(@Body() body: CreateAddressDto) : Promise<Address>{
        return this.addressSerivce.createAddress(body)
    }

    @Get('/getAll')
    getAllAddress(@Query() params: GetAllAddressFilterDto) : Promise<GetAllAddressResponeDto>{
        return this.addressSerivce.getAllAddress(params)
    }
}