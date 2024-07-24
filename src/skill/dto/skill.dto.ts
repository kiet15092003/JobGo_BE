import { Skill } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class createSkillDto{
    @IsNotEmpty()
    @IsString()
    name: string
}

export interface GetAllSkillFilterDto {
    items_per_page?: number
    page?: number
    query? : string
} 

export interface GetAllSkillResponeDto {
    data: Skill[]
    total: number
    currentPage: number
    itemsPerPage: number
}