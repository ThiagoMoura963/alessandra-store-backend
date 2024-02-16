import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class HashPasswordPiPe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  transform(password: string) {
    const salt = this.configService.get<string>('SALT_PASSWORD');

    const hashedPassword = bcrypt.hash(password, salt!);

    return hashedPassword;
  }
}
