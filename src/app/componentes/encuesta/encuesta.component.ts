import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Encuesta } from 'src/app/clases/encuesta';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { EstadoTurno, Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  condicionesPaciente:string[]=["Buena","Regular","Mala"];;
  infraestructuraHospital:string[]=["Buena","Regular","Mala"];
  insumosHospital:string[]=["Suficiente","Regular","Insuficiente"];

  condicionesPacienteR!:number;
  infraestructuraHospitalR!:number;
  insumosHospitalR!:number;

  
  turno!:Turno;

  v1=false;
  v2=false;
  v3=false;

  turnoEncuestado: any;

  fecha!:any;

  cargo=false;
  hayEncu=false;

  mostrar=false;
  mensaje="";
  color!:string;

  constructor(private router: Router, private tomarFecha:ActivatedRoute, private turnosS:TurnosService) { 
    this.fecha = this.tomarFecha.snapshot.paramMap.get('fecha');
    
    this.turnosS.devolverListadoEncuestas().subscribe(lista=>{
      lista.filter(element=>{
        if(element.fecha == this.fecha){
          this.hayEncu=true;
        }
      })

      if(this.hayEncu==false){
        this.turnosS.devolverListadoTurnos().subscribe(listaT=>{
          listaT.filter(elementT=>{
            if(elementT.fecha==this.fecha)
            this.turno=elementT;
          })
          this.cargo=true;
        })
      }
      
    })

    


  }

  ngOnInit(): void {
  }

  carg1(){
    this.v1=true;
  }

  carg2(){
    this.v2=true;
  }

  carg3(){
    this.v3=true;
  }

  subirEncuesta(){  
    if(this.v1==true && this.v2==true && this.v3==true){

      let encu=new Encuesta(this.condicionesPacienteR, this.insumosHospitalR, this.infraestructuraHospitalR, this.fecha, 1);      
      
      this.turnosS.guardarEncuesta(encu);
      this.mensaje="Gracias por responder";  
      this.color="alert-success";
      this.mostrar=true;
      this.router.navigate(["encuesta"]);
    }else{
      this.color="alert-warning";

      this.mostrar=true;
      this.mensaje="Debe contestar todas las preguntas";
      
    }
  }

  seguir(){
    this.router.navigate(["encuesta"]);
  }

  cerrarPopup(mostrar2:boolean){
    this.mostrar=mostrar2;
  }

}
