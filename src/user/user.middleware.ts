import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from './user.service';
import { NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) { }

  use(req: any, res: any, next: NextFunction) {
    // req.userService = this.userService;
    next();
  }
}