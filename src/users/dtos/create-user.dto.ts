import { IsBoolean, IsEmail, IsString } from "class-validator";

export class createUserDto {
    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsBoolean()
    admin: boolean
}