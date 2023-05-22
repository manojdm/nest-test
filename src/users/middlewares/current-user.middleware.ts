import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from 'src/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    const userId = req.session.user || {};

    if (userId) {
      const user = await this.usersService.findUser(userId);
      req.currentUser = user;
    }

    next();
  }
}
