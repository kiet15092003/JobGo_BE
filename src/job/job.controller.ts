import { Body, Controller, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/job.dto';
import { Job } from '@prisma/client';

@Controller('job')
export class JobController {
    constructor(private jobService: JobService){}
    @Post('/create')
    createJob(@Body() body: CreateJobDto): Promise<Job> {
        return this.jobService.createJob(body)
    }
}
