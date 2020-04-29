import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../core/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private tokenService: TokenService) { }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.tokenService.setToken(response.body.token);
          this.router.navigate(['/buckets']);
          this.loading = false;
        } else {
          this.router.navigate(['/login']);
        }
      });
    
  }

}
