import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const user = request.currentUser;

        console.log(user)

        return user.admin
    }
}