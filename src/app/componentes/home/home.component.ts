import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { AutenticationService } from 'src/app/shared/autentication.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: boolean = false;
  esAdmin: boolean = false;
  public static updateUserStatus: Subject<boolean> = new Subject();

  constructor(public router: Router, public authService: AutenticationService) {
    NavBarComponent.updateUserStatus.subscribe(res => {
      this.isLogged = true;
      let user: any = JSON.parse(localStorage.getItem('loggedUser') || " ");
      if (user.tipo == 'administrador') {
        this.esAdmin = true;
      }
    })
  }

  ngOnInit(): void {
    let user: any = JSON.parse(localStorage.getItem('loggedUser') || " ");

    if (user) {
      this.isLogged = true;
      if (user.tipo == 'administrador') {
        this.esAdmin = true;
      }
    }
    else {
      this.isLogged = false;
    }

  }


  //6 botones, 3 para paciente, 2 para especialistas, 1 para admin, pero primero hay que registrarse y elegir si es especialista o usuario

}
