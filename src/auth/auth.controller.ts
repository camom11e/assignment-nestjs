import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService} from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Key } from 'src/common/decorators/key.decorator';
import { RequestResponseInterceptor } from 'src/common/interceptors/request-response.interceptor';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

@Controller()
@UseInterceptors(RequestResponseInterceptor)
export class AuthController {
  
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('users/login')
  @ApiCreatedResponse({ type: UserEntity })
  @Key('user')
  async signIn(@Body() signInDto: SignInDto) {
    const { token } = await this.authService.signIn(signInDto);
    const user = await this.usersService.findUser(signInDto.email);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    return new UserEntity({
      email: signInDto.email,
      username: user.username,
      bio: '',
      image: '',
      token,
    });
  }
}
