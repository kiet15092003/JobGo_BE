import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateJobDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    salary: string

    @IsNotEmpty()
    @IsInt()
    minYOE: number

    @IsOptional()
    @IsInt()
    position?: number

    @IsOptional()
    @IsInt()
    jobType?: number

    @IsOptional()
    @IsInt()
    timeType?: number

    @IsNotEmpty()
    @IsInt()
    addressId: number;

    @IsArray()
    @IsInt({ each: true })
    skills: number[]; 

    @IsNotEmpty()
    @IsInt()
    recruiterId: number;
}