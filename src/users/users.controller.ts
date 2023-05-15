import { Body, Controller, Delete, Get, Param, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { customInterceptor, customSerializer } from 'src/serializers/users.serializer';
import { userDto } from './dtos/user.dto';
import { AuthService } from './auth.services';
import { createUserDto } from './dtos/create-user.dto';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('users')
@customInterceptor(userDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
      return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.user = null;
        return 'signed out.'
    }
    
    @Post('/')
    addUser(@Body() body: any){
        return this.usersService.createUser(body.email, body.password)
    }


    @Get('/:id')
    getUser(@Param('id') id: any){
        return this.usersService.findUser(parseInt(id))
    }

    @Post('/signup')
    async SignupUser(@Body() body: createUserDto, @Session() session: any){
        const user =  await this.authService.signup(body.email, body.password);
        session.user = user.id;
        return user
    }

    @Post('/signin')
    async SigninUser(@Body() body: createUserDto, @Session() session: any){
        const user =  await this.authService.signin(body.email, body.password);
        session.user = user.id;
        return user
    }

    @Get()
    findUsers(@Query('email') email: string){
        return this.usersService.findUsers(email)
    }

    @Post('/:id')
    updateUser(@Param('id') id: string, @Body() user: UpdateUserDto){
        return this.usersService.update(parseInt(id), user)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string){ 
        this.usersService.remove(parseInt(id))
        return 'deleted'
    }

}

