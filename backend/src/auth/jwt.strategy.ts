import { Injectable, HttpException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";
import { JwtConstants } from "./constants";
import { UserEntity } from "src/Entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            //supplies the method by which the JWT will be extracted from the Request. We will use the standard approach 
            // of supplying a bearer token in the Authorization header of our API requests
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JwtConstants.secret,
        })
    }

    /**
     * This function verifies whether a user exists, and whether their credentials are valid
     */

    // In the auth.module.ts we have: PassportModule.register({defaultStrategy: "jwt"}) which tells 
    // that when we use @UseGuards(AuthGuard()), for example in todo.controller.ts, then the strategy from passport-jwt
    // is used by default. For example in todo.controller.ts, we use this, and when client call an endpoint, etc getAll, 
    // the validate method is fired. 

    // The validate method gets as parameter a payload with this particular type, because 
    // it was declared in this way when the jwt got created in AuthService, loginUser method. 

    // The AuthGuard inspects the request for a valid JWT token, and if a valid token is present, it calls the 
    // validate method of the JwtStrategy. 

    // The validate returns the user, and this information is then stored in the property 'user' of the request. The property
    // can be changed in auth.module.ts

    async validate(payload: { username: string, userID: number }) {
        const user: Omit<UserEntity, "password"> = await this.authService.validateUser(payload.username, payload.userID);
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user;
    }
}