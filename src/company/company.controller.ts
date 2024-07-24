import { Body, Controller, Post } from '@nestjs/common';
import { CompanyCreateDto } from './dto/company.dto';
import { Company } from '@prisma/client';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService){}

    @Post('/create')
    createCompany(@Body() body: CompanyCreateDto) : Promise<Company> {
        return this.companyService.createCompany(body)
    }
}
