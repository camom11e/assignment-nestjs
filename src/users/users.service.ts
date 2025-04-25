import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { generate } from 'rxjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService,
    private readonly jwtService: JwtService,  
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto,
    })
  }


  findUser(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    })
  }

  findProfile(username: string) {
    return this.prismaService.user.findFirst({
      where: { username },
      select: { username: true, bio: true, image: true },
    })
  }

  async generateToken(email: string) {
    return {
      token: await this.jwtService.signAsync({ email: email })
    }
  }
}