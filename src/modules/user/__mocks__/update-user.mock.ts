import { UpdatePasswordDto } from '../dto/update-password.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  newPassword: 'newPassword-mock',
  lastPassword: 'Password123!',
};

export const invalidUpdatePasswordMock: UpdatePasswordDto = {
  newPassword: 'invalidNewPassword-mock',
  lastPassword: 'invalidLastPassword-mock',
};
