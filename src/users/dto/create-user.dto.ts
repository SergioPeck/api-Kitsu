import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from 'src/common/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(6, 80)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  displayName: string;

  @IsEnum(Role)
  role?: Role; // defecto USER
}
