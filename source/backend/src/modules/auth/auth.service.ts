import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(phone: string, password: string, nickname?: string) {
    const existing = await this.prisma.user.findUnique({ where: { phone } });
    if (existing) {
      throw new BadRequestException('该手机号已注册');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        phone,
        passwordHash,
        nickname: nickname || `用户${phone.slice(-4)}`,
      },
    });
    return this.generateToken(user.id, 'user');
  }

  async login(phone: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      throw new UnauthorizedException('手机号或密码错误');
    }
    if (user.status === 1) {
      throw new UnauthorizedException('账号已被封禁');
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('手机号或密码错误');
    }
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    return this.generateToken(user.id, 'user');
  }

  async loginByCode(phone: string) {
    // Mock: In production, verify SMS code
    let user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          phone,
          passwordHash: '',
          nickname: `用户${phone.slice(-4)}`,
        },
      });
    }
    if (user.status === 1) {
      throw new UnauthorizedException('账号已被封禁');
    }
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    return this.generateToken(user.id, 'user');
  }

  async adminLogin(username: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    if (admin.status === 1) {
      throw new UnauthorizedException('管理员账号已禁用');
    }
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    await this.prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });
    return this.generateToken(admin.id, 'admin');
  }

  private generateToken(sub: number, type: string) {
    return {
      access_token: this.jwtService.sign({ sub, type }),
      token_type: 'Bearer',
    };
  }
}