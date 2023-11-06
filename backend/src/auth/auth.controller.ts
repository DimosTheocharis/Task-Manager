import { Controller, Post, Body, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/Dtos/registerUser.dto';
import { LoginUserDto } from 'src/Dtos/loginUser.dto';
import { RegistrationStatus } from 'src/Interfaces/registerStatus';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("register")
    async registerUser(@Body(ValidationPipe) registerUserDto: RegisterUserDto) {
        const registrationStatus: RegistrationStatus = await this.authService.registerUser(registerUserDto);
        if (!registrationStatus.success) {
            throw new HttpException(registrationStatus.message, HttpStatus.BAD_REQUEST);
        }
        return registrationStatus;
    }

    @Post("login")
    loginUser(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
        return this.authService.loginUser(loginUserDto);
    }
}
