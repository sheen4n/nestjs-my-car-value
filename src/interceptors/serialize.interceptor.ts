import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): {};
}

export const Serialize = (dto: ClassConstructor) =>
  UseInterceptors(new SerializeInterceptor(dto));

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(_context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler
    // console.log('I am running before the handler', context);
    return handler.handle().pipe(
      map((data: ClassConstructor) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        // Run something before the response is sent out
        // console.log('I am running before the response is sent out', data);
      }),
    );
  }
}
