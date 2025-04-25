import { Controller, Post, Body, Req, UseInterceptors, Get,UseGuards  } from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'
import { RequestResponseInterceptor } from 'src/common/interceptors/request-response.interceptor'
import { Key } from 'src/common/decorators/key.decorator'
import { run } from 'node:test';

@Controller()
@UseInterceptors(RequestResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @ApiCreatedResponse({ type: UserEntity })
  @Post('users')
  @Key('user')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findUser(createUserDto.email);
    const {token} = await this.usersService.generateToken(createUserDto.email)
    return new UserEntity({
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password,
      bio: '',
      image: '',
      token,
    });
  }

  @ApiCreatedResponse({ type: UserEntity })
  @Get('user')
  async getCurrentUser(@Req() req){

    return ({
      "req":req.token
      




    })
  }
}


