import { Component, OnInit } from '@angular/core';
import { AutenticationService } from 'src/app/shared/autentication.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  esAdmin: boolean = false;
  esPac: boolean = false;
  esEspec: boolean = false;

  constructor(public authService: AutenticationService) { }

  ngOnInit() {
    let user: any = JSON.parse(localStorage.getItem('loggedUser') || " ");
    if (user) {
      if (user.tipo == "administrador") {
        this.esAdmin = true;
        this.esEspec = false;
        this.esPac = false;
      } else if (user.tipo == "especialista") {
        this.esAdmin = false;
        this.esEspec = true;
        this.esPac = false;
      } else if (user.tipo == "paciente") {
        this.esAdmin = false;
        this.esEspec = false;
        this.esPac = true;
      }
    }
  }

}
