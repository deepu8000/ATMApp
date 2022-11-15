import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/services/src/public-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  activeLink: string = '';
  constructor(private authService : AuthService) { 
    this.activeLink = 'overview';
  }

  ngOnInit(): void {
  }

  logout() : void
  {
    this.authService.logOut();
  }

}
