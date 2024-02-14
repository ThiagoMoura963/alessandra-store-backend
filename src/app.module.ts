import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from './city/city.module';
import { AuthModule } from './auth/auth.module';
import { StateModule } from './state/state.module';
import { CacheModule } from './cache/cache.module';
import { AdressModule } from './adress/adress.module';
import { HttpExceptionFilter } from './filters/http-exception-filter';
import { PostgresConfigService } from './config/postgres.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    UserModule,
    AdressModule,
    StateModule,
    CityModule,
    AuthModule,
    CacheModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
