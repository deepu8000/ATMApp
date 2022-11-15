import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { AuthService } from 'projects/services/src/public-api';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements AfterViewInit  {

  @ViewChild('userName') userNameField !: MatInput;
  @ViewChild('password') password !: MatInput;

  error: string = '';
  readonly loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) { 
    
  }
  ngAfterViewInit(): void {
    this.userNameField.focus();
  }

  submit() {
    if (this.loginForm.valid) {
      const userName: string = this.loginForm.value.userName ? this.loginForm.value.userName : '';
      const password: string = this.loginForm.value.password ? this.loginForm.value.password : '';
      let res = this.authService.login(userName, password);
      if (res === false) {
        this.error = "Please enter valid Username and Password!";
        return;
      }
      else{
        alert("Logged in successfully!")
        return;
      }
    }
    if(!this.loginForm.value.password)
    {
      this.password.focus();
    }
    if(!this.loginForm.value.userName)
    {
      this.userNameField.focus();
    }
    
    this.error = "Please enter Username and Password!";
  }

}
