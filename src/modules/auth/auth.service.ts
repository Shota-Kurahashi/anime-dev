import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as bcrypt from 'bcrypt';
import { supabase } from 'src/lib/supabase';
import { PrismaService } from '../prisma/prisma.service';
import { AuthInput } from './dto/auth.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async login(authInput: AuthInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authInput.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Not User');
    }

    const isPasswordValid = await bcrypt.compare(
      authInput.password,
      user.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.createToken(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(user.id, refreshToken);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        loginStatus: true,
      },
    });

    return { accessToken, refreshToken };
  }

  async sighUp(authInput: AuthInput) {
    const { email, password, ...profileInput } = authInput;
    const hashed = await bcrypt.hash(password, 12);
    const { data, error } = await supabase.auth.api.createUser({
      email,
      password,
    });

    if (error) {
      throw error.message;
    }

    try {
      await this.prisma.user.create({
        data: {
          id: data.id,
          email,
          hashedPassword: hashed,
          loginStatus: true,
          profile: {
            create: {
              ...profileInput,
            },
          },
        },
      });

      const { accessToken, refreshToken } = await this.createToken(
        data.id,
        data.email,
      );

      await this.updateRefreshToken(data.id, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('This email is already taken');
        }
      }
      throw error;
    }
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: null,
        loginStatus: false,
      },
    });

    return { accessToken: null, refreshToken: null };
  }

  async createToken(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        userId,
        email,
      },
      {
        expiresIn: '10m',
        secret: this.config.get('JWT_SECRET'),
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        userId,
        email,
        accessToken,
      },
      {
        expiresIn: '7d',
        secret: this.config.get('JWT_REFRESH_SECRET'),
      },
    );

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('Not User');
    }

    const isRefreshValid = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );

    if (!isRefreshValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.createToken(user.id, user.email);

    await this.updateRefreshToken(user.id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
}
