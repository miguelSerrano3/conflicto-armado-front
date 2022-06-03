import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAndRegisterService } from 'src/app/services/login-and-register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  public loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private loginService: LoginAndRegisterService,
    private router: Router
    ) { 
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  loginUser(){
    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
        const data = {
          nombre: response.name,
          apellido: response.apellido,
          rol: response.rol
        }
        sessionStorage.setItem('sesion', JSON.stringify(data));
        this.router.navigate(['/dashboard']);
    },(err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Correo o contraseña incorrecta',
      })
    }
    );
  }
}
