import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadInterface } from "./jwt-payload.interface";


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private _userRepository: UserRepository,
    private _jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this._userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const {username, password} = authCredentialsDto;
    const user = this._userRepository.findOne({username});
    const userPassword = await user.then(el => el.password)

    if (user && (await bcrypt.compare(password, userPassword))) {
      const payload: JwtPayloadInterface = {username};
      const accessToken = this._jwtService.sign(payload);
      return {accessToken};
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
