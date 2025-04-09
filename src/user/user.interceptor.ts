import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) { }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (userId && !request.userEntity) {
      request.userEntity = await this.userService.findOne(userId);
    }

    return next.handle();
  }
}
