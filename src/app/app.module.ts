import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { HomeComponent } from './componentes/home/home.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { RegistroAdministradorComponent } from './componentes/registro-administrador/registro-administrador.component';
import { RegistroEspecialistaComponent } from './componentes/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './componentes/registro-paciente/registro-paciente.component';
import { RegistroComponent } from './registro/registro.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { TurnosPacienteComponent } from './componentes/turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './componentes/turnos-especialista/turnos-especialista.component';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { DetalleTurnoComponent } from './componentes/detalle-turno/detalle-turno.component';
import { AltaHistoriaClinicaComponent } from './componentes/alta-historia-clinica/alta-historia-clinica.component';
import { FiltroMixtoEspecialidadEspecialistaPipe } from './pipes/filtro-mixto-especialidad-especialista.pipe';
import { FiltroTurnoPipe } from './pipes/filtro-turno.pipe';
import { FiltroEspecialidadesPipe } from './pipes/filtro-especialidades.pipe';
import { FiltroEspecialistasPipe } from './pipes/filtro-especialistas.pipe';
import { FiltroMixtoEspecialidadPacientePipe } from './pipes/filtro-mixto-especialidad-paciente.pipe';
import { RespuestaBooleanoPipe } from './pipes/respuesta-booleano.pipe';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { AltaTurnosComponent } from './componentes/alta-turnos/alta-turnos.component';
import { ListaEspecialistasComponent } from './componentes/lista-especialistas/lista-especialistas.component';
import { ListaEspecialidadesComponent } from './componentes/lista-especialidades/lista-especialidades.component';
import { ListaPacientesComponent } from './componentes/lista-pacientes/lista-pacientes.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { DetalleUsuarioComponent } from './componentes/detalle-usuario/detalle-usuario.component';
import { DetalleHistoriaClinicaComponent } from './componentes/detalle-historia-clinica/detalle-historia-clinica.component';
import { HorariosComponent } from './componentes/horarios/horarios.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { TablaUsuariosComponent } from './componentes/tabla-usuarios/tabla-usuarios.component';
import { InformesComponent } from './componentes/informes/informes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegistroAdministradorComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    RegistroComponent,
    VerifyEmailComponent,
    MisTurnosComponent,
    TurnosPacienteComponent,
    TurnosEspecialistaComponent,
    TablaTurnosComponent,
    DetalleTurnoComponent,
    AltaHistoriaClinicaComponent,
    FiltroMixtoEspecialidadEspecialistaPipe,
    FiltroTurnoPipe,
    FiltroEspecialidadesPipe,
    FiltroEspecialistasPipe,
    FiltroMixtoEspecialidadPacientePipe,
    RespuestaBooleanoPipe,
    TurnosComponent,
    AltaTurnosComponent,
    ListaEspecialistasComponent,
    ListaEspecialidadesComponent,
    ListaPacientesComponent,
    MiPerfilComponent,
    DetalleUsuarioComponent,
    DetalleHistoriaClinicaComponent,
    HorariosComponent,
    PacientesComponent,
    SeccionUsuariosComponent,
    TablaUsuariosComponent,
    InformesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
