// session.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { SessionService } from './session.service';

@Injectable()
export class SessionPipe implements PipeTransform {
  constructor(private readonly sessionService: SessionService) { }

  async transform(value: number, metadata: ArgumentMetadata) {
    const foundedSession = await this.sessionService.findSession(value);

    if (!foundedSession) {
      throw new NotFoundException("Session not found")
    }

    return foundedSession
  }
}
