import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Router } from '@angular/router';
import { RegisterUserDto } from 'src/app/shared/Dtos/registerUser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.buildRegisterForm();
  }

  buildRegisterForm() {
    this.form = this.fb.group({
      username: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl(null)
    },
      { validators: this.passwordsMatchValidator() }
    )
  }

  /**
   * The field 'confirmPassword' should have the same value as the filed 'password'
   */
  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const matched: boolean = control.value["password"] === control.value["confirmPassword"];

      return matched ? null : { passwordsDontMatch: true };

    };
  }

  register() {
    if (this.form.invalid) {
      return;
    }

    const registerUserDto: RegisterUserDto = new RegisterUserDto();
    registerUserDto.username = this.form.value["username"];
    registerUserDto.password = this.form.value["password"];

    this.apiService.register(registerUserDto).subscribe({
      next: (value) => {
        this.toastr.success("User got created successfully!", "", { timeOut: 1000 }).onHidden.subscribe(
          (dt) => {
            this.router.navigateByUrl("/login");
          }
        )
      },
      error: (error) => {
        this.toastr.error(`${error.error.message}`, `${error.error.statusCode}`, { timeOut: 1000 })
      }
    })
  }
}
