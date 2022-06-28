import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { getDatabase } from "firebase/database";
import { environment } from 'src/environments/environment';

const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://tp-final-clinicas-2022.web.app/",
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const db = getFirestore(app);
  
  
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Get a list of cities from your database
async function getCities(db: Firestore) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'tp-final-clinicas-2022';

  items: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
  }

}
