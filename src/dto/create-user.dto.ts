import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
export class CreateUserDto{
    @IsNotEmpty()
    // @IsInt()
    id:number;

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsEmail()
    email:string;

    age:number;

}