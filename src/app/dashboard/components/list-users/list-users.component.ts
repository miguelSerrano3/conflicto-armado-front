import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(public formBuilder: FormBuilder,
    private loginService: LoginAndRegisterService,) { 
      
      this.formSearch = this.formBuilder.group({
        'type': ['', [Validators.required]],
        'valor': ['', [Validators.required]],
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
}
