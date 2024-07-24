import { Candidate, Skill } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsArray } from "class-validator";

export class CreateCandidateDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsString()
    yoe: string;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    @IsString()
    perWeb: string;
}

export interface GetAllCandidateFilterType {
    items_per_page?: number
    page?: number
    query? : string
} 

export interface GetAllCandidateResponeType {
    data: Candidate[]
    total: number
    currentPage: number
    itemsPerPage: number
}

export class UpdateCandidateDto {
    @IsOptional()
    @IsString()
    yoe: string;

    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    @IsString()
    perWeb: string;

    @IsOptional()
    @IsArray()
    skills: Skill[]
}

export class CreateRecruiterDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsNumber()
    companyId: number
}