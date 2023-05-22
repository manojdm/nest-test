import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: any){}
    
    createUser(email:string, password: string, admin: boolean){
        const user = this.repo.create({email, password, admin})

        return this.repo.save(user);
    }

    findUser(id: number){
        return this.repo.findOneBy({ id });
    }

    findUsers(email: string){
        return this.repo.find({where: {email}})
    }

    async update(id: number, attrs: Partial<User>){
        const user = await this.findUser(id);

        if(!user){
            throw new NotFoundException('User not found')
        }

        Object.assign(user, attrs)

        return this.repo.save(user)
    }

    async remove(id: number){
        const user = await this.findUser(id);

        if(!user){
            throw new NotFoundException('User not found')
        }

        this.repo.remove(user)
    }
}
