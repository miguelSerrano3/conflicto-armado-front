import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAndRegisterService } from 'src/app/services/login-and-register.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  public registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private loginService: LoginAndRegisterService,
    private router: Router
  ) { 
    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'document_type': ['', Validators.required],
      'document': [ null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveUser(){
    const dataUser = {
      "name": this.registerForm.get('name').value,
      "apellido":this.registerForm.get('surname').value,
      "email": this.registerForm.get('email').value,
      "password": this.registerForm.get('password').value,
      "rol": "Subsidio",
      "barrio": null,
      "direccion": null,
      "edad": 0,
      "date_of_birth": null,
      "document_type": this.registerForm.get('document_type').value,
      "document_number": this.registerForm.get('document').value,
      "city": null
    }
    this.loginService.saveUser(dataUser).subscribe(
      (respon) => {
        Swal.fire(
          'Genial!',
          'El usuario se registro con exito',
          'success'
        )
        this.router.navigate(['/home']);
      }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrio un error',
      });
    });
  }
}
