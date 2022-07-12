import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dias } from '../clases/dias';

@Injectable({
  providedIn: 'root'
})
export class DiaService {

  dias;

  constructor(private firestore: AngularFirestore) {
    this.dias = firestore.collection("dias").snapshotChanges();
  }

  getDias() {
    return this.firestore.collection("dias").snapshotChanges();
  }

  getDia(key: string) {
    return this.firestore.collection("dias").doc(key).valueChanges();
  }

  guardarDia(dia: Dias) {
    return this.firestore.collection("dias").add({
      dia: dia.dia
    });
  }
}
