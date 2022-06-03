import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  @ViewChild('drawer') drawer;
  nameUser = 'Example';
  mobileQuery: MediaQueryList;
  isExpanded: boolean = true;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router
  ) { 

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  private _mobileQueryListener: () => void;

  ngOnInit(): void {
    const sesion = JSON.parse(sessionStorage.getItem('sesion'));
    this.nameUser = `${sesion.nombre} ${sesion.apellido}`
  }

  openSideNav() {
    if (this.mobileQuery.matches) {
      this.isExpanded = true;
      this.drawer.opened = true;
    }
  }

  closeMenu(){
    if (this.mobileQuery.matches) {
      this.drawer.close();
    }
  }

  logout(){
    sessionStorage.removeItem('sesion');
    this.router.navigate(['/home']);
  }
}
