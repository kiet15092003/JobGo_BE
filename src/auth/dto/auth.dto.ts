import { IsEmail , IsNotEmpty, Matches, MinLength } from "class-validator"

export class RegisterDto{
    // @IsNotEmpty()
    // name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    // @IsNotEmpty()
    // @Matches(/^[0-9]{10}$/)
    // phone: string

    @IsNotEmpty()
    @MinLength(6)
    password: string
    //status: number
}

export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    password: string
}