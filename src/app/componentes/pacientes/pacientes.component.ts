import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  @Output() seSeleccionoPaciente: EventEmitter<any> = new EventEmitter<any>();
  miPaciente!: Paciente;
  arrayMisPacientes: Paciente[] = [];
  arrayMailsPacientes: string[] = [];
  filter: string = '';
  user: any = JSON.parse(localStorage.getItem('loggedUser') || " ");




  constructor(public pacienteService: PacienteService, public turnosService: TurnosService) {
  }

  ngOnInit() {
    this.turnosService.getTurnosFinalizadosByEspecialista(this.user.mail).subscribe((turnos: any) => {
      let listaMailsPacientes: string[] = [];
      for (let index = 0; index < turnos.length; index++) {
        let turno = turnos[index].payload.doc.data();
        listaMailsPacientes.push(turno.pacienteMail);
      }
      let listaMisPacientes: Paciente[] = [];
      this.pacienteService.getPacientesByList(listaMailsPacientes).subscribe((pacientes: any) => {
        for (let index = 0; index < pacientes.length; index++) {
          let paciente = pacientes[index].payload.doc.data();
          listaMisPacientes.push(paciente);
        }
        this.arrayMisPacientes = listaMisPacientes;
      })
    })
  }

  seleccionarPaciente(paciente: Paciente) {
    this.seSeleccionoPaciente.emit(paciente);
    this.miPaciente = paciente;
  }

}
