import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus 
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
  
        if (data === undefined || data === null) {
          return data;
        }

    
        if (statusCode >= HttpStatus.BAD_REQUEST) { // Jika status code adalah error
            return data; 
        }

    
        let message = 'Operation successful';
        if (request.method === 'POST') {
          message = 'Saved successfully'; // Untuk Register
        } else if (request.method === 'PUT' || request.method === 'PATCH') {
          message = 'Updated successfully';
        } else if (request.method === 'DELETE') {
          message = 'Deleted successfully';
        } else if (request.method === 'GET') {
          message = 'Data retrieved successfully';
        }

       
        return {
          status: true,
          message: message,
          data: data,
        };
      }),
    );
  }
}