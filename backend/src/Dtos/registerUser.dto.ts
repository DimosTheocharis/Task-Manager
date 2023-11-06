import { IsNotEmpty, MinLength, MaxLength, } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(15)
    password: string;
}