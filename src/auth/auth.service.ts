import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prismaService:PrismaService,
        private jwtService: JwtService,
    ){}
    register = async(userData: RegisterDto) : Promise<User> => {
        // check email already in used
        const user = await this.prismaService.user.findUnique({
            where:{
                email: userData.email
            }
        })
        if (user){
            throw new HttpException({message:'This email has been used'},HttpStatus.BAD_REQUEST)
        }
        // hash password and store to db
        const hashPassword = await hash(userData.password,10)
        const res = await this.prismaService.user.create({
            data: {...userData, password: hashPassword}
        })
        return res;
    }
    login = async (userData: LoginDto) : Promise<any> => {
        const user = await this.prismaService.user.findUnique({
            where : {
                email: userData.email
            }
        })
        if (!user) {
            throw new HttpException({message: 'Your email is not exist'}, HttpStatus.UNAUTHORIZED)
        }
        const verify = userData.password === user.password
        if (!verify){
            throw new HttpException({message: 'Invalid password'}, HttpStatus.UNAUTHORIZED)
        }

        // Generate jwt 
        const payload = {id: user.id, email: user.email}
        const accessToken = await this.jwtService.signAsync(payload,{
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: '3h'
        })

        return accessToken
    }
}
