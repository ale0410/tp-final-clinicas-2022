import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dias } from 'src/app/clases/dias';
import { Especialista } from 'src/app/clases/especialista';
import { DiaService } from 'src/app/servicios/dia.service';

@Component({
  selector: 'app-lista-dias',
  templateUrl: './lista-dias.component.html',
  styleUrls: ['./lista-dias.component.css']
})
export class ListaDiasComponent implements OnInit {

  @Output() seSeleccionoDia: EventEmitter<any> = new EventEmitter<any>();
  @Input() especialistaSeleccionado!: Especialista;


  arrayDias: Dias[] = [];
  filter: string = '';


  constructor(public diaService: DiaService) { }

  ngOnChanges() {
    //this.arrayDias = this.especialistaSeleccionado.dias;
  }

  ngOnInit() { }

  seleccionarDia(dia: Dias) {
    this.seSeleccionoDia.emit(dia);
  }

}
