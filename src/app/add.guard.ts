import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()

export class AddGuard implements CanActivate {
    constructor(public router: Router) {
    }
    canActivate(): Promise<boolean> | boolean {
        if (localStorage.token === undefined) {
            return this.router.navigate(["/permission"]);
        }
        return true;
    }
}
