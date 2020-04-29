import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./core/auth.guard";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { BucketsComponent } from "./buckets/buckets.component";


const routes: Routes = [
  { path: 'buckets', component: BucketsComponent, canActivate: [AuthGuard], runGuardsAndResolvers: "always", },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'buckets' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
