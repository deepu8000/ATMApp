import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'projects/models/src/lib/inteface/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _users: User[] = [
    {
      UserName: 'admin',
      Password: '@dmin123',
      Role: 'admin'
    },
    {
      UserName: 'user',
      Password: 'u&er123',
      Role: 'user'
    }
  ];

  private _loggerInUser?: User = undefined;

  constructor(private router: Router) {
    let user = localStorage.getItem("user");
    if (user) {
      this._loggerInUser = JSON.parse(user);
    }
  }

  public login(userName: string, password: string, redirectTo: string = 'dashboard'): boolean {
    // Get the first user matching the credentials
    const user = this._users.find(x => x.UserName === userName && x.Password === password);
    if (user) {
      this._loggerInUser = user;
      localStorage.setItem("user", JSON.stringify(user));
      this.router.navigate([redirectTo]);
      return true;
    }
    return false;
  }

  public logOut(): boolean {
    this._loggerInUser = undefined;
    localStorage.clear();
    this.router.navigate(['login'],);
    return true;
  }

  public isAuthenticated(): boolean {
    return this._loggerInUser !== undefined;
  }

  public isAuthorized(roles:string[])
  {
    debugger;
    return roles.find(x=>x === this._loggerInUser?.Role);
  }

}
