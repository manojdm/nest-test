import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";

export const customInterceptor = (dto: any) => {
    return UseInterceptors(new customSerializer(dto));
}

export class customSerializer implements NestInterceptor {

    constructor(private dto: any){}

    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> {
        return handler.handle().pipe(
            map((data:any) => {
                return plainToClass(this.dto ,data,{
                    excludeExtraneousValues: true
                })
            })
        )
    }
}