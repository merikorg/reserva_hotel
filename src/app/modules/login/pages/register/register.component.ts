import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  registerForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading: boolean = false;
  alert: boolean = false;
  texto: string = "";
  tipo: string = "";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private firebase: FirebaseService) { }

  sendDataRegister() {
    if (this.registerForm.valid) {
      this.loading = !this.loading;
      this.firebase.getColecctionWhere('users', 'email', this.registerForm.get('email')?.value).get().then(querySnapshot => {
        if (!querySnapshot.empty) {
          this.registerForm.reset();
          this.loading = !this.loading;
          this.alert = true;
          this.texto = "El usuario ya existe."
          this.tipo = "danger";
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        } else {
          const id = this.generateRandomString(8);
          let data={
            email: this.registerForm.get('email')?.value,
            nombre: this.registerForm.get('nombre')?.value,
            apellido: this.registerForm.get('apellido')?.value,
            id: id
          }
          this.firebase.createUser(data, id, 'users').then(() => {
            this.firebase.registerUser({ email: this.registerForm.get('email')?.value, password: this.registerForm.get('password')?.value })
              .then(() => {
                this.loading = !this.loading;
                this.registerForm.reset();
                this.router.navigate(['/dashboard']);
              }).catch(() => {
                this.loading = !this.loading;
                this.registerForm.reset();
                this.alert = true;
                this.texto = "Ha ocurrido un error al registrar el usuario. Inténtalo nuevamente o comunícate con soporte."
                this.tipo = "danger";
                setTimeout(() => {
                  this.alert = false;
                }, 3000);
              });
          }).catch(() => {
            this.loading = !this.loading;
            this.registerForm.reset();
            this.alert = true;
            this.texto = "Ha ocurrido un error al registrar el usuario. Inténtalo nuevamente o comunícate con soporte."
            this.tipo = "danger";
            setTimeout(() => {
              this.alert = false;
            }, 3000);
          });
        }
      });
    } else {
      this.alert = true;
      this.texto = "No dejar campos vacios."
      this.tipo = "danger";
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    }
  }

  generateRandomString(longitud: number): string {
    let resultado = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < longitud; i++) {
      resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
  }

}
