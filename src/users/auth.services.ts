import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService){}

    async signup(email: string, password: string, admin: boolean){
        let user = await this.usersService.findUsers(email)
        if(user.length > 0){
            throw new BadRequestException('user already exists');
        }

        const salt = randomBytes(5).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        user = this.usersService.createUser(email, result, admin);

        return user;
    }

    async signin(email: string, password: string){
        let [user] = await this.usersService.findUsers(email);

        if(user.length == 0){
            throw new NotFoundException('user doesn\'t exists');
        }

        const [salt, hashedPassword] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(hashedPassword != hash.toString('hex')){
            throw new BadRequestException('Please enter proper credentials');
        }

        return user;

    }
}