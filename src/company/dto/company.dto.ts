import { Address } from "@prisma/client";
import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CompanyCreateDto{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    websiteURL: string

    @IsNotEmpty()
    @IsArray()
    @IsInt({ each: true })
    addressIds: number[];
}