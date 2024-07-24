import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateCandidateDto, CreateRecruiterDto, GetAllCandidateFilterType, GetAllCandidateResponeType, UpdateCandidateDto } from './dto/user.dto';
import { Candidate, Recruiter } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post('/candidate/create')
    createCandidate(@Body() body: CreateCandidateDto): Promise<Candidate> {
        return this.userService.createCandidate(body)
    }

    @Get('/candidate/getAll')
    getAllCandidate(@Query() param: GetAllCandidateFilterType): Promise<GetAllCandidateResponeType> {
        return this.userService.getAllCandidate(param)
    }

    @Get('/candidate/:id')
    getDetailCandidate(@Param('id', ParseIntPipe) id: number) : Promise<Candidate> {
        return this.userService.getDetailCandidate(id)
    }

    @Put('/candidate/:id')
    updateCandidate(
        @Param('id', ParseIntPipe) id: number, 
        @Body() body: UpdateCandidateDto) : Promise<Candidate> {
        return this.userService.updateCandidate(id, body)
    }

    @Post('/recruiter/create')
    createRecruiter(@Body() body: CreateRecruiterDto): Promise<Recruiter> {
        return this.userService.createRecruiter(body)
    }
}