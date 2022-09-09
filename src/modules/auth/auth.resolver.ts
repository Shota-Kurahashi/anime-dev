import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { AuthInput } from './dto/auth.input';
import { UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from './guards/acessToken.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { CurrentUser } from './decorator/user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async login(
    @Args('authInput') authInput: AuthInput,
    @Context() context: any,
  ) {
    const jwt = await this.authService.login(authInput);
    console.log(context.req.ip);
    context.res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });

    context.res.cookie('refresh_token', jwt.refreshToken, {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });

    return {
      accessToken: jwt.accessToken,
      refreshToken: jwt.refreshToken,
      message: 'OK',
    };
  }

  @Mutation(() => Auth)
  async sighUp(
    @Args('authInput') authInput: AuthInput,
    @Context() context: any,
  ) {
    const jwt = await this.authService.sighUp(authInput);
    context.res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });

    context.res.cookie('refresh_token', jwt.refreshToken, {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });
    return {
      accessToken: jwt.accessToken,
      refreshToken: jwt.refreshToken,
      message: 'OK',
    };
  }

  @Mutation(() => Auth)
  @UseGuards(AccessTokenGuard)
  logout(@CurrentUser() user: User, @Context() context: any) {
    context.res.cookie('access_token', '', {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });

    context.res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });
    return this.authService.logout(user.id);
  }

  @Mutation(() => Auth)
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(
    @CurrentUser() user: User & { refreshToken: string },
    @Context() context: any,
  ) {
    const jwt = await this.authService.refresh(user.id, user.refreshToken);
    context.res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });

    context.res.cookie('refresh_token', jwt.refreshToken, {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });
    return {
      accessToken: jwt.accessToken,
      refreshToken: jwt.refreshToken,
      message: 'OK',
    };
  }
}
