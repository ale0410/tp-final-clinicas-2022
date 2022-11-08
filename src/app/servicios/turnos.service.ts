import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { EstadoTurno, Turno } from '../clases/turno';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Encuesta } from '../clases/encuesta';
import { Comentario } from '../clases/comentario';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  turnos;
  listaTurnos!:Observable<Turno[]>;
  listaEncuestas!:Observable<Encuesta[]>;
  listaComentarios!:Observable<Comentario[]>;

  constructor(private firestore: AngularFirestore) {
    this.turnos = firestore.collection("turnos").snapshotChanges();

    this.listaTurnos=this.firestore.collection("turnos").snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      })   
    );

    this.listaComentarios=this.firestore.collection("comentarios").snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      })   
    );

    this.listaEncuestas=this.firestore.collection("encuestas").snapshotChanges().pipe(
      map(actions=>{
        return actions.map(
          a=>{
            const data= a.payload.doc.data();
            const id=a.payload.doc.id;
            return {id, ...(data as any)}
          }
        );
      })   
    );
  }

  getTurnos() {
    return this.firestore.collection("turnos").snapshotChanges();
  }

  getTurnosByPaciente(email: string) {
    return this.firestore.collection("turnos", ref => ref.where('pacienteMail', '==', email)).snapshotChanges();
  }

  getTurno(turno: Turno) {
    return this.firestore.collection("turnos", ref => ref.where('pacienteMail', '==', turno.pacienteMail).where('especialistaMail', '==', turno.especialistaMail).where('fecha', '==', turno.fecha)).snapshotChanges();
  }

  getTurnosFinalizados() {
    return this.firestore.collection("turnos", ref => ref.where('estado', '==', EstadoTurno.finalizado)).snapshotChanges();
  }

  getTurnosByEspecialista(email: string) {
    return this.firestore.collection("turnos", ref => ref.where('especialistaMail', '==', email)).snapshotChanges();
  }

  getTurnosFinalizadosByEspecialista(email: string) {
    return this.firestore.collection("turnos", ref => ref.where('especialistaMail', '==', email).where('estado', '==', EstadoTurno.finalizado)).snapshotChanges();
  }

  getTurnosFinalizadosByPaciente(email: string) {
    return this.firestore.collection("turnos", ref => ref.where('pacienteMail', '==', email).where('estado', '==', EstadoTurno.finalizado)).snapshotChanges();
  }

  guardarTurno(turno: Turno) {
    return this.firestore.collection("turnos").add({
      pacienteMail: turno.pacienteMail,
      pacienteNombre: turno.pacienteNombre,
      especialidad: turno.especialidad,
      especialistaMail: turno.especialistaMail,
      especialistaNombre: turno.especialistaNombre,
      fecha: turno.fecha,
      estado: turno.estado,
      calificacion: turno.calificacion,
      encuesta: turno.encuesta,
      resenia: turno.resenia,
    });
  }

  cambiarEstadoTurno(turno: Turno) {
    let doc = this.getTurno(turno).subscribe((turnos: any) => {
      const turnoId = turnos[0].payload.doc.id;
      var turnoForUpdate = this.firestore.collection("turnos").doc(turnoId);
      turnoForUpdate.update({
        estado: turno.estado,
        resenia: turno.resenia
      })
        .then(() => { })
        .catch((error) => { });
      doc.unsubscribe()
    })
  }

  calificar(turno: Turno) {
    let doc = this.getTurno(turno).subscribe((turnos: any) => {
      const turnoId = turnos[0].payload.doc.id;
      var turnoForUpdate = this.firestore.collection("turnos").doc(turnoId);
      turnoForUpdate.update({
        calificacion: turno.calificacion,
      })
        .then(() => { })
        .catch((error) => { });
      doc.unsubscribe()
    })
  }   

  guardarEncuesta(encuesta: Encuesta) {
    return this.firestore.collection("encuestas").add({
      muyBuena: encuesta.muy_buena,
      buena: encuesta.buena,
      regular: encuesta.regular,
      mala: encuesta.mala,
      muyMala: encuesta.muy_mala,
    });
  }   

  guardarComentario(comentario: Comentario) {
    return this.firestore.collection("comentarios").add({
      pregunta1: comentario.preg1,
      pregunta2: comentario.preg2,
      pregunta3: comentario.preg3,
      pregunta4: comentario.preg4,
      comentario: comentario.comentario,
      idTurno: comentario.idTurno,
    });
  }   


  actualizarTurno(turnoA:Turno, estado:EstadoTurno) {  
    
    
    switch(estado){
      case EstadoTurno.enespera:
        turnoA.estado = EstadoTurno.enespera;
        break; 
      case EstadoTurno.aceptado:
        turnoA.estado = EstadoTurno.aceptado;
        break;
      case EstadoTurno.cancelado:
        turnoA.estado = EstadoTurno.cancelado;
        break;
      case EstadoTurno.rechazado:
        turnoA.estado = EstadoTurno.rechazado;
        break;
      case EstadoTurno.finalizado:
        turnoA.estado = EstadoTurno.finalizado;
        break;
    }
    
    this.firestore.doc('turnos' + '/'+turnoA.id).update({...turnoA});    
    
  }

  devolverListadoTurnos(){
    return this.listaTurnos;
  }

  devolverListadoEncuestas(){
    return this.listaEncuestas;
  }

  devolverListadoComentarios(){
    return this.listaComentarios;
  }
}
