import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private _authService;
    constructor(_authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    test(req: any): void;
}
