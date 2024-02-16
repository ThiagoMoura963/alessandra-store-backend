import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RequestUser } from 'src/modules/auth/interfaces/request-user.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private consoleLogger: ConsoleLogger,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    this.consoleLogger.error(exception);
    console.error(exception);

    const { httpAdapter } = this.adapterHost;

    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest<RequestUser>();

    if ('user' in request) {
      this.consoleLogger.log(
        `Rota sendo acessada pelo usuário ${request.user.sub}`,
      );
    }

    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
            },
          };

    httpAdapter.reply(response, body, status);
  }
}
