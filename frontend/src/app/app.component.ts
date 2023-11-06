import { Component, OnInit } from '@angular/core';
import { ApiService, ApplicationUser } from './Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'frontend';
  public loggedIn: boolean = false;
  public username: string | null = null;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onRouteChange();

    this.apiService.getCurrentUserObservable().subscribe((user: ApplicationUser | null) => {
      if (user) {
        this.loggedIn = true;
        this.username = user.username;
      } else {
        this.loggedIn = false;
        this.username = null;
      }
    })

  }

  logout() {
    this.username = null;
    this.apiService.logout();
    this.loggedIn = false;
    this.toastr.success("Logged out successfully!", "", { timeOut: 500 }).onHidden.subscribe(
      (value) => {
        this.router.navigateByUrl("/login");
      }
    )
  }

  onRouteChange() {
    const currentUser: ApplicationUser | null = this.apiService.getCurrentUserValue();
    if (currentUser) {
      this.username = currentUser.username;
      this.loggedIn = true;
    }
  }
}
