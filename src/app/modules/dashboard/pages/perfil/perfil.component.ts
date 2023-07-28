import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

interface UserData {
  nombre: string;
  apellido: string;
  id:string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent {
  perfilForm: FormGroup = this.formBuilder.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
  });

  //alert
  texto: string = "";
  tipo: string = "";
  alert: boolean = false;

  id:string = "";

  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private firebase: FirebaseService) {
    this.firebase.getStatus().subscribe(user => {
      let email = `${user?.email}`;
      this.firebase.getColecctionWhere('users', 'email', email).get().then(querySnapshot => {
        querySnapshot.forEach(data => {
          let userData = data.data() as UserData;
          this.id = `${userData.id}`;
          this.perfilForm.setValue({
            nombres: `${userData.nombre}`,
            apellidos: `${userData.apellido}`,
          });
        });
      });
    });
  }

  submitForm() {
    this.loading = !this.loading;
    if (this.perfilForm.valid) {
      this.firebase.updateUser(this.perfilForm.value, this.id, 'users').then(() => {
        this.loading = !this.loading;
        this.texto = "Datos modificados correctamente.";
        this.tipo = "success";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      }).catch(() => {
        this.loading = false;
        this.texto = "Error al modificar los datos. Intente de nuevo.";
        this.tipo = "danger";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      });
    } else {
      this.loading = !this.loading;
      this.texto = "No puede haber campos vacios.";
      this.tipo = "danger";
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    }
  }

}
