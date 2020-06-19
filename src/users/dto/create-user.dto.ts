import {
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsNumber,
  Min,
  IsString,
  IsISO8601,
} from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  gender: number;
  @IsNotEmpty()
  @IsISO8601()
  dateOfBirth: Date;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
