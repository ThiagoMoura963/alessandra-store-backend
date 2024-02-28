import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { jwtMock } from '../__mocks__/jwt.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { ListUserDto } from '../../user/dto/list-user.dto';
import { loginUserMock } from '../__mocks__/login-user.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
            verifyAsync: jest.fn().mockRejectedValue(jwtMock),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should authenticate with valid email and password', async () => {
    const user = await service.login(
      loginUserMock.email,
      loginUserMock.password,
    );

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ListUserDto(userEntityMock),
    });
  });

  it('should authenticate with invalid passowrd', async () => {
    expect(service.login(loginUserMock.email, '345')).rejects.toThrow();
  });

  it('should authenticate with not found email', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined!);

    expect(
      service.login(loginUserMock.email, loginUserMock.password),
    ).rejects.toThrow();
  });

  it('should authenticate with error in UserService', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockRejectedValue(new Error());

    expect(
      service.login(loginUserMock.email, loginUserMock.password),
    ).rejects.toThrow();
  });
});
