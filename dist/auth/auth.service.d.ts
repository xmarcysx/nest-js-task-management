import { UserRepository } from "./users.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private _userRepository;
    private _jwtService;
    constructor(_userRepository: UserRepository, _jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
