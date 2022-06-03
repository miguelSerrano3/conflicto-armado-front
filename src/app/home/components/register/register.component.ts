import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  public registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'document_type': ['', Validators.required],
      'document': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

}
