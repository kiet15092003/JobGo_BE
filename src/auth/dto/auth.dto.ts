import { IsEmail , IsEnum, IsNotEmpty, Matches, MinLength } from "class-validator"
import { Role } from '@prisma/client'; 

export class RegisterDto{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/)
    phoneNum: string

    @IsNotEmpty()
    @IsEnum(Role) 
    role: Role;
}

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string
}