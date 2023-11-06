import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from 'src/Entities/user.entity';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from './jwt.strategy';
import { JwtConstants } from './constants';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: {
        algorithm: "HS512",
        expiresIn: "15m",
      }
    }),
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user" //defines the field of the request that the decrypted information about the logged user is stored in
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtStrategy, AuthService]
})
export class AuthModule { }
