import { LoginUserDto } from './../Dtos/loginUser.dto';
import { RegisterUserDto } from './../Dtos/registerUser.dto';
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from 'src/Entities/user.entity';
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { RegistrationStatus } from 'src/Interfaces/registerStatus';
import { LoginStatus } from './../Interfaces/loginStatus';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    async registerUser(registerUserDto: RegisterUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus;
        const { username, password } = registerUserDto;

        if (await this.repository.findOne({ where: { username: username } })) {
            status = {
                success: false,
                message: "User already exists!"
            }
            return status;
        }

        // Generates a hash from the given password. Generally, the hash for a certain password is always the same, 
        // however bcrypt.has also salts the result producing 'random' different values each time for the same data


        const hashedPassword: string = await bcrypt.hash(password, 12);
        const salt: any = bcrypt.getSalt(hashedPassword); // produces a random string for the hashed password

        const userEntity: UserEntity = this.repository.create({
            username: username,
            password: hashedPassword,
            salt: salt,
        })

        status = {
            success: true,
            message: "User registered successfully!"
        }

        try {
            await this.repository.save(userEntity);
        } catch (error) {
            status = {
                success: false,
                message: error.message
            }
        }
        return status;
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        const { username, password } = loginUserDto;
        const user: UserEntity = await this.findUserByUsername(username);

        if (!user) {
            throw new UnauthorizedException("Wrong credentials!");
        }

        const authenticated: boolean = await bcrypt.compare(password, user.password);
        if (authenticated) {
            const jwtPayload = { username, userID: user.userID };
            const jwtToken = await this.jwtService.signAsync(jwtPayload);

            return {
                token: jwtToken,
                username: user.username,
            };
        } else {
            throw new UnauthorizedException("Wrong credentials!");
        }
    }

    /**
     * Checks if a user with the given credentials exist in the database
     */
    async validateUser(username: string, userID: number) {
        const user: UserEntity = await this.repository.findOne({ where: { userID: userID } });
        if (user && user.username === username) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Finds user by username by camel-case-checking
     */
    private async findUserByUsername(username: string): Promise<UserEntity> {
        const users: UserEntity = await this.repository.manager.query(`
            SELECT * FROM user
            WHERE BINARY user.username = ?
        `,
            [username]
        )
        return users[0];
    }
}
