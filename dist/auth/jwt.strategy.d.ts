import { Strategy } from "passport-jwt";
import { UserRepository } from "./users.repository";
import { JwtPayloadInterface } from "./jwt-payload.interface";
import { User } from "./user.entity";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private _usersRepository;
    constructor(_usersRepository: UserRepository);
    validate(payload: JwtPayloadInterface): Promise<User>;
}
export {};
