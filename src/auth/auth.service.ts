import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateCandidateDto } from 'src/user/dto/user.dto';


@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    register = async (userData: RegisterDto): Promise<User> => {
        // Check if email is already in use
        const existingUser = await this.prismaService.user.findUnique({
            where: { email: userData.email }
        });

        if (existingUser) {
            throw new HttpException({ message: 'This email has been used' }, HttpStatus.BAD_REQUEST);
        }

        // Hash password and store in database
        const hashedPassword = await hash(userData.password, 10);

        const res = await this.prismaService.user.create({
            data: { ...userData, password: hashedPassword, role: userData.role }
        });

        // Create candidate or recruiter and store 
        if (userData.role === 0){
            const newTempObj = new CreateCandidateDto();
            newTempObj.userId = res.id;
            const candiate = await this.userService.createCandidate(newTempObj);
        } else {

        }
        return res;
    };

    login = async (userData: LoginDto): Promise<any> => {
        const user = await this.prismaService.user.findUnique({
            where: { email: userData.email }
        });

        if (!user) {
            throw new HttpException({ message: 'Your email is not exist' }, HttpStatus.UNAUTHORIZED);
        }

        // Compare hashed password
        const isPasswordValid = await compare(userData.password, user.password);

        if (!isPasswordValid) {
            throw new HttpException({ message: 'Invalid password' }, HttpStatus.UNAUTHORIZED);
        }

        // Generate JWT token
        const payload = { id: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: '3h'
        });

        return accessToken;
    };
}
