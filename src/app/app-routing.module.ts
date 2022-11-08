import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroModule } from './modulos/registro/registro.module';
import { AdminAuthGuard } from './servicios/admin-auth.guard';
import { AuthGuard } from './servicios/auth.guard';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { AltaTurnosComponent } from './componentes/alta-turnos/alta-turnos.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { EspecAuthGuard } from './servicios/espec-auth.guard';
import { InformesComponent } from './componentes/informes/informes.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ComentarioComponent } from './componentes/comentario/comentario.component';
import { TranslationComponent } from './componentes/translation/translation.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registro', loadChildren: () => import('./modulos/registro/registro.module').then(m => RegistroModule)
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'mis-turnos', component: MisTurnosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'turnos', component: TurnosComponent, canActivate: [AdminAuthGuard] //Para cuando quiero sacar un turno, primero mostrar botones con todos los profesionales que sean redondos
                                                                              //Y arriba de cada boton el nombre del médico
                                                                              //Cuando hago click tengo que mostrar otros botones con las especialidades del médico que seleccioné
                                                                              //cuando clickeo en la especialidad muestro los botones con los dias disponibles del medico
                                                                              //botones con las horas disponibles
  },
  {
    path: 'solicitar-turno', component: AltaTurnosComponent, canActivate: [AuthGuard]
  },
  {
    path: 'mi-perfil', component: MiPerfilComponent
  },
  {
    path: 'seccion-usuarios', component: SeccionUsuariosComponent, canActivate: [AdminAuthGuard]
  },
  {
    path: 'pacientes', component: PacientesComponent, canActivate: [EspecAuthGuard]
  },
  {
    path: 'informes', component: InformesComponent, canActivate: [AdminAuthGuard]
  },
  {
    path: 'encuestas', component: EncuestaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'comentarios', component: ComentarioComponent, canActivate: [AuthGuard]
  },
  {
    path: 'idiomas', component: TranslationComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
