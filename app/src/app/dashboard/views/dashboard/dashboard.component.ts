import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'projects/services/src/public-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeLink: string = '';
  constructor(private snackBar: MatSnackBar,private authService : AuthService) { 
    this.activeLink = 'overview';
  }

  ngOnInit(): void {
  }

  logout() : void
  {
    this.authService.logOut();
    this.snackBar.open("Logout successfully!", "ok", {
      verticalPosition: "top",
    });
  }

}
