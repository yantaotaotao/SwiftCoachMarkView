import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from './prisma.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { sub: number; type: string }) {
    if (payload.type === 'admin') {
      const admin = await this.prisma.admin.findUnique({
        where: { id: payload.sub },
      });
      if (!admin || admin.status === 1) {
        throw new UnauthorizedException('管理员不存在或已禁用');
      }
      return { id: admin.id, type: 'admin', username: admin.username, role: admin.role };
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { merchant: true },
    });
    if (!user || user.status === 1) {
      throw new UnauthorizedException('用户不存在或已封禁');
    }
    return {
      id: user.id,
      type: 'user',
      phone: user.phone,
      nickname: user.nickname,
      merchantId: user.merchant?.id,
      merchantStatus: user.merchant?.status,
    };
  }
}