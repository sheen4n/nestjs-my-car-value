import {NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";
import {UsersService} from "../users.service";
import {User} from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

export class CurrentUserMiddleware implements NestMiddleware {
  constructor (private usersService: UsersService) {}
  async use (req: Request, _res: Response, next: NextFunction): Promise<void> {
    const {userId} = req.session || {};
    if (userId) {
      const user = await this.usersService.findOne(userId);
      // @ts-ignore
      req.currentUser = user;
    }

    next();
  }
}