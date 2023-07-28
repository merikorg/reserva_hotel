import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SharedRoutingModule } from 'src/app/shared/shared-routing.module';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  static firebaseConfig: {} = {
    apiKey: "AIzaSyDmbNOzbm9fwrrVgg4Gp22xu41VBN5lh7s",
    authDomain: "desarrollo-jose.firebaseapp.com",
    projectId: "desarrollo-jose",
    storageBucket: "desarrollo-jose.appspot.com",
    messagingSenderId: "185340631527",
    appId: "1:185340631527:web:516d1bf5f6b3deab704542"
  };

  constructor(private firebaseFirestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth) { }

  //--------------------------- FIRESTORE -----------------------------------//
  getUsers(collection: string) {
    return this.firebaseFirestore.collection(collection).valueChanges();
  }

  getUsersID(id: string, collection: string) {
    return this.firebaseFirestore.collection(collection).doc(id).valueChanges();
  }

  createUser(data: any, id: string | undefined, collection: string) {
    return this.firebaseFirestore.collection(collection).doc(id).set(data);
  }

  createData(data: any, collection: string) {
    return this.firebaseFirestore.collection(collection).add(data);
  }

  updateUser(data: any, id: string, collection: string) {
    return this.firebaseFirestore.collection(collection).doc(id).update(data);
  }

  DeleteUSer(id: string, collection: string) {
    return this.firebaseFirestore.collection(collection).doc(id).delete();
  }

  getColecctionWhere(colecction: string, campo: string, valor: string) {
    return this.firebaseFirestore.collection(colecction).ref.where(campo, '==', valor);
  }

  getWhere(colecction: string, campo: string,valor: string) {
    return this.firebaseFirestore.collection(colecction).ref.where(campo, '!=', valor);
  }

  // --------------------------- AUTHENTICATION --------------------------//
  loginUser({ email, password }: any) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.firebaseAuth.signOut();
  }

  registerUser({ email, password }: any) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  getStatus() {
    return this.firebaseAuth.authState;
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }

}
