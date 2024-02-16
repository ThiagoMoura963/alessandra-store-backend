import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { RequestUser } from 'src/modules/auth/interfaces/request-user.interface';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private consoleLogger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest<Request | RequestUser>();
    const response = contextHttp.getResponse() as Response;

    const { path, method } = request;
    const { statusCode } = response;

    this.consoleLogger.log(`${path} ${method}`);

    const instantPreController = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.consoleLogger.log(
            `Rota sendo acessada pelo usuário ${request.user.sub}`,
          );
          const routeExecutionTime = Date.now() - instantPreController;
          this.consoleLogger.log(
            `Response: Status ${statusCode} - ${routeExecutionTime}ms`,
          );
        }
      }),
    );
  }
}
