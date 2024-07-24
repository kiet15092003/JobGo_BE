import { Address } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    country: string

    @IsNotEmpty()
    @IsString()
    city: string

    @IsNotEmpty()
    @IsString()
    district: string
}

export interface GetAllAddressFilterDto{
    items_per_page?: number
    page?: number
    query? : string,
    isDistinctCity? : boolean
}

export interface GetAllAddressResponeDto {
    data: Address[]
    total: number
    currentPage: number
    itemsPerPage: number
}