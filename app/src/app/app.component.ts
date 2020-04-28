import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './core/token.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'object-storage-applicaton';
  token;

  constructor(private router: Router, private tokenService: TokenService, private authService: AuthService) {
}

ngOnInit() {
  this.token = this.tokenService.getToken();
}

logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
}

}
