import { Injectable } from '@angular/core';
import { Status } from 'projects/models/src/lib/enum/status.enum';
import { LoginResponse } from 'projects/models/src/lib/inteface/login-response';
import { User } from 'projects/models/src/lib/inteface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _users :User[] = [
    {
      UserName:'admin',
      Password:'@dmin123',
      Role:'admin'
    },
    {
      UserName:'user',
      Password:'u&er123',
      Role:'user'
    }
  ]

  constructor() { }

  public login(userName:string, password : string):LoginResponse
  {
      let response : LoginResponse = {
          status : Status.Failure
      };
      // Get the first user matching the credentials
      const user = this._users.find(x=>x.UserName=== userName && x.Password === password);
      if(user)
      {
          response.status = Status.Success;
          response.user = user;
          return response;
      }
      return response;
  }

}
