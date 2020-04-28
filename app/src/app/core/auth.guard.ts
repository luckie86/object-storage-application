import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { TokenService } from "../core/token.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenService: TokenService
    ) {}

    canActivate() {
        const token = this.tokenService.getToken();
        if (token) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}