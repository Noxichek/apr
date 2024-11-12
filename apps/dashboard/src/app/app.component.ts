import { CommonModule } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import {UserService} from "@ng-mf/data-access-user";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'ng-mf-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService)
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn: any) => {
        console.log(loggedIn)
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('');
          }
        });
      });
  }
}
