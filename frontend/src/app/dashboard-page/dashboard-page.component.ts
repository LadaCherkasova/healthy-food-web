import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { AuthStore } from '../services/auth.store';
import { Router } from '@angular/router';

declare var Userfront: any;

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  constructor(
    private authorizationService: AuthorizationService,
    private authStore: AuthStore,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authorizationService
      .isAuthorizated(Userfront.accessToken())
      .subscribe(res => {
        if (res) {
          this.authStore.update({isLogged: true, token: Userfront.accessToken()});
          this.router.navigateByUrl('');
        }
      })
  }
}
