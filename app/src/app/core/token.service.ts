import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from "../../environments/environment"; 

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(@Inject(LOCAL_STORAGE) private storageService: StorageService) {}

  public getToken() {
    return this.storageService.get(environment.STORAGE_KEY);
  }

  public setToken(token: string) {
    return this.storageService.set(environment.STORAGE_KEY, token);
  }

  public clearToken(): void {
    this.storageService.remove(environment.STORAGE_KEY);
  }

}
