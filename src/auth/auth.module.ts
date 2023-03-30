import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategy/local.strategy";
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import { jwtConstants } from "../common";
import { JwtStrategy } from "./strategy/jwt-strategy";

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '30d'},
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
