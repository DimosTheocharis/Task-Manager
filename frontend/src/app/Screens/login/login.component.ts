import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { LoginUserDto } from 'src/app/shared/Dtos/loginUser';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  public returnUrl!: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const user = this.apiService.getCurrentUserValue();
    if (user) {
      this.router.navigateByUrl("/")
    }

    // When the user tries to access a protected page and the Auth Guard redirects him to the Login page, it also appends 
    // to the Login page URL a query string named returnUrl to preserve the original page URL that the user was trying to access.
    // All this happen in auth.guard.ts
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || "/";

    this.apiService.logout();
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.form = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  login() {
    if (this.form.invalid) {
      return;
    }

    const loginUserDto = new LoginUserDto();
    loginUserDto.username = this.form.value["username"];
    loginUserDto.password = this.form.value["password"];

    this.apiService.login(loginUserDto).subscribe(
      (dt) => {
        this.toastr.success("Logged successfully!", "", { timeOut: 1000 }).onHidden.subscribe(
          (dt) => {
            this.router.navigateByUrl(this.returnUrl);
          }
        )
      },
      (error) => {
        this.toastr.error(error.error.message, error.error.error);
      }
    )
  }


}
