import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  @Length(6, 80)
  email?: string;


  @IsString()
  @Length(3, 20)
  displayName?: string;
}