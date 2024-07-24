import { IsEmail , IsEnum, IsInt, IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator"

export class RegisterDto{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsInt()
    role: number
}

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string
}