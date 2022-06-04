import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Models/user';
import { LoginAndRegisterService } from 'src/app/services/login-and-register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  userList: User[] = [];
  dataSource;
  displayedColumns: string[] = ['name', 'apellido', 'edad', 'document_type', 'document_number', 'email','acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public formSearch: FormGroup;
  public personForm: FormGroup;
  @ViewChild('updatePersonModal') updatePersonModal: TemplateRef<any>;

  constructor(public formBuilder: FormBuilder,
    private loginService: LoginAndRegisterService,
    public dialog: MatDialog) { 
      
      this.formSearch = this.formBuilder.group({
        'type': ['', [Validators.required]],
        'valor': ['', [Validators.required]],
      });

      this.personForm = this.formBuilder.group({
        'id_user': [null, [Validators.required]],
        'name': ['', [Validators.required]],
        'apellido': ['', Validators.required],
        'email': ['', [Validators.required, Validators.email]],
        'barrio': ['', [Validators.required]],
        'direccion':  ['', [Validators.required]],
        'edad':  [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        'date_of_birth':  ['', [Validators.required]],
        'document_type':  ['', [Validators.required]],
        'document_number':  [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      });
    }

  ngOnInit(): void {
    this.loginService.getUser().subscribe(
      (response) => {
        this.userList = response;
        this.dataSource = new MatTableDataSource<User>(this.userList);
        this.dataSource.paginator = this.paginator;
      }, (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error',
        });
      }
    );
  }

  deleteNutrients(element){
    Swal.fire({
      title: 'Estas seguro de querer eliminar el registro ?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.deleteUser(element).subscribe(
          (_response) => {
            Swal.fire(
              'Correcto',
              'El registro se elimino con exito',
              'success'
            )
            this.ngOnInit();
          }, (_err:any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocurrio un error',
            });
          }
        );
      }
    })
  }


  search(){
    if(this.formSearch.get('valor').value === ''){
      this.formSearch.get('type').setValue('');
    }
    this.loginService.UserBy(this.formSearch.value).subscribe(
      (response) => {
        this.userList = response;
        this.dataSource = new MatTableDataSource<User>(this.userList);
        this.dataSource.paginator = this.paginator;
      }, (_err:any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocurrio un error',
        });
      }
    );
  }

  openDialog(element) {
    this.personForm.get('id_user').setValue(element.id_user);
    this.personForm.get('name').setValue(element.name);
    this.personForm.get('apellido').setValue(element.apellido);
    this.personForm.get('email').setValue(element.email);
    this.personForm.get('barrio').setValue(element.barrio);
    this.personForm.get('direccion').setValue(element.direccion);
    this.personForm.get('edad').setValue(element.edad);
    this.personForm.get('date_of_birth').setValue(element.date_of_birth);
    this.personForm.get('document_type').setValue(element.document_type);
    this.personForm.get('document_number').setValue(element.document_number);
    this.dialog.open(this.updatePersonModal, {width: '25vw'});
  }

  updatePerson(){

  }
}
