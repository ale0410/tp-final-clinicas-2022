import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AutenticationService } from "../shared/autentication.service";
//import { ToastrService } from 'ngx-toastr';
import { NavBarComponent } from '../componentes/nav-bar/nav-bar.component';
import { PacienteService } from '../servicios/paciente.service';
import { AdministradorService } from '../servicios/administrador.service';
import { EspecialistaService } from '../servicios/especialista.service';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { LogService } from '../servicios/log.service';
import { Log } from '../clases/log';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  public adminFotoUrl!: string;
  public pac1FotoUrl!: string;
  public pac2FotoUrl!: string;
  public pac3FotoUrl!: string;
  public espec1FotoUrl!: string;
  public espec2FotoUrl!: string;
  public visible: boolean = true;

  constructor(
    public administradorService: AdministradorService,
    public pacienteService: PacienteService,
    public especialistaService: EspecialistaService,
    public authService: AutenticationService,
    public router: Router,
    //public toastr: ToastrService,
    public logService: LogService
  ) { }

  ngOnInit() {
    let admin = this.administradorService.getAdministrador("ale23989@gmail.com").subscribe((usuarios: any) => {
      if (usuarios[0] != null) {
        this.adminFotoUrl = usuarios[0].payload.doc.data().fotoUrl;
      }
      admin.unsubscribe();
    });

    let pac1 = this.pacienteService.getPaciente("majomartinez04@gmail.com").subscribe((usuarios: any) => {
      if (usuarios[0] != null) {
        this.pac1FotoUrl = usuarios[0].payload.doc.data().foto1Url;
      }
      pac1.unsubscribe();
    });

    let pac2 = this.pacienteService.getPaciente("alesilversalmon@hotmail.com").subscribe((usuarios: any) => {
      if (usuarios[0] != null) {
        this.pac2FotoUrl = usuarios[0].payload.doc.data().foto1Url;
      }
      pac2.unsubscribe();
    });

    let pac3 = this.pacienteService.getPaciente("jmterzano@gmail.com").subscribe((usuarios: any) => {
      if (usuarios[0] != null) {
        this.pac3FotoUrl = usuarios[0].payload.doc.data().foto1Url;
      }
      pac3.unsubscribe();
    });

    let espec1 = this.especialistaService.getEspecialista("valeriamatu@gmail.com").subscribe((usuarios: any) => {
      if (usuarios[0] != null) {
        this.espec1FotoUrl = usuarios[0].payload.doc.data().fotoUrl;
      }
      espec1.unsubscribe();
    });

    let espec2 = this.especialistaService.getEspecialista("mgw009@gmail.com").subscribe((usuarios: any) => {
      if (usuarios[0] != null) {
        this.espec2FotoUrl = usuarios[0].payload.doc.data().fotoUrl;
      }
      espec2.unsubscribe();
    });

  }

  logIn() {
    this.authService.SignIn(this.email, this.password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.logInAdmin();
        if (!this.userIsLogged()) {
          this.logInEspecialista();
          if (!this.userIsLogged()) {
            this.logInPaciente();
          }
        }
      }).catch((error) => {
        //this.toastr.error('Algo sali?? mal, revise los datos ingresados', 'Login');
      })
  }

  logInAdmin() {
    let user = this.administradorService.getAdministrador(this.email).subscribe((usuarios: any) => {
      if (usuarios[0] != null) {
        let loggedUser = usuarios[0].payload.doc.data();
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        NavBarComponent.updateUserStatus.next(true);
        //this.toastr.success('Perfecto, bienvenide ' + loggedUser.nombre, 'Login');
        let log: Log = new Log(loggedUser.mail, loggedUser.tipo, new Date());
        this.logService.guardarLogIngreso(log);
        this.router.navigate(['home']);
      }
      user.unsubscribe();
    });
  }

  logInPaciente() {
    let cuenta: any = JSON.parse(localStorage.getItem('user') || "");
    let user = this.pacienteService.getPaciente(this.email).subscribe((usuarios: any) => {
      if (usuarios[0] != null) {
        if (cuenta.emailVerified) {
          let loggedUser = usuarios[0].payload.doc.data();
          localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
          NavBarComponent.updateUserStatus.next(true);
          //this.toastr.success('Perfecto, bienvenide ' + loggedUser.nombre, 'Login');
          let log: Log = new Log(loggedUser.mail, loggedUser.tipo, new Date());
          this.logService.guardarLogIngreso(log);
          this.router.navigate(['home']);
        } else {
          //this.toastr.error('No se ha verificado el email correctamente', 'Login');
          this.router.navigate(['registro/verify-email']);
        }
      }
      user.unsubscribe();
    });
  }

  logInEspecialista() {
    let cuenta: any = JSON.parse(localStorage.getItem('user') || "");
    let user = this.especialistaService.getEspecialista(this.email).subscribe((usuarios: any) => {
      if (usuarios[0] != null) {
        if (cuenta.emailVerified) {
          let loggedUser = usuarios[0].payload.doc.data();
          if (loggedUser.habilitado == true) {
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            NavBarComponent.updateUserStatus.next(true);
            //this.toastr.success('Perfecto, bienvenide ' + loggedUser.nombre, 'Login');
            let log: Log = new Log(loggedUser.mail, loggedUser.tipo, new Date());
            this.logService.guardarLogIngreso(log);
            this.router.navigate(['home']);
          } else {
            localStorage.removeItem('user');
            //this.toastr.error('Su cuenta a??n no se encuentra habilitada. Por favor, p??nganse en contaco con su administrador', 'Login');
          }
        } else {
          //this.toastr.error('No se ha verificado el email correctamente', 'Login');
          this.router.navigate(['registro/verify-email']);
        }
      }
      user.unsubscribe();
    });
  }

  cargarAdmin() {
    this.email = "ale23989@gmail.com"; //Las animaciones tienen que tener dos transiciones, desde arriba hacia abajo
    this.password = "Sonic2022#";      //En Mi Perfil cuando entro como paciente puedo entrar mi historia clinica en un excel y descargarlo como pdf
  }

  cargarPaciente1() {
    this.email = "majomartinez04@gmail.com"; //En la seccion usuarios cuando entro como administrador, descargar todos los usuarios
    this.password = "Majo1965#";             //Y si hago click me baja un excel con todos los turnos de los usuarios.
  }

  cargarPaciente2() {
    this.email = "alesilversalmon@hotmail.com";
    this.password = "123456";
  }

  cargarPaciente3() {
    this.email = "jmterzano@gmail.com";
    this.password = "juan123";
  }

  cargarEspecialista1() {
    this.email = "valeriamatu@gmail.com";
    this.password = "Vale1975#";
  }

  cargarEspecialista2() {
    this.email = "mgw009@gmail.com";
    this.password = "123456";
  }

  userIsLogged() {
    return JSON.parse(localStorage.getItem('user') || "");

  }

}
