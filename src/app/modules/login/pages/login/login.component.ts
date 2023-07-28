import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loading_login: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  tipo: string = "";
  texto: string = "";
  alert: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private firebase: FirebaseService) { }


  ngOnInit(): void {
    this.firebase.logoutUser();
  }

  sendDataLogin() {
    if (this.loginForm.valid) {
      this.loading_login = !this.loading_login;
      this.firebase.loginUser(this.loginForm.value).then(() => {
        this.loading_login = !this.loading_login;
        this.router.navigate(['/dashboard']);
      }).catch(error => {
        this.alert = !this.alert;
        let error_code_msg = '';
        switch (error.code) {
          case 'auth/wrong-password':
            error_code_msg = 'Contraseña incorrecta';
            break;
          case 'auth/user-not-found':
            error_code_msg = 'El usuario no existe.';
            break;
          case 'auth/invalid-email':
            error_code_msg = 'La dirección de correo electrónico no es valido';
            break;
          case 'auth/user-disabled':
            error_code_msg = 'El usuario está inhabilitado';
            break;
          case 'auth/user-token-expired':
            error_code_msg = 'Token de acceso caducado';
            break;
          case 'auth/network-request-failed':
            error_code_msg = 'Problema de red. Revisa tu conexión a internet.';
            break;
          case 'auth/too-many-requests':
            error_code_msg = 'El acceso a esta cuenta se ha deshabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde';
            break;
          default:
            error_code_msg = error.code;
        }
        this.loading_login = !this.loading_login;
        this.texto = error_code_msg;
        this.tipo = 'danger';
        setTimeout(() => {
          this.alert = !this.alert;
        }, 3000);
      });
    } else {
      this.alert = true;
      this.tipo = "danger";
      this.texto = "No dejar campos vacios.";
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    }
  }

}
