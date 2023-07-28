import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmailServiceService } from 'src/app/services/email-service/email-service.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent {
  id: string = '';
  nombre: string = '';

  rooms: any[] = [];

  //Data Modal
  id_room: string = '';
  nombre_room: string = '';

  reservaForm: FormGroup = this.formBuilder.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    fecha_nacimiento: ['', Validators.required],
    genero: ['', Validators.required],
    tipo_documento: ['', Validators.required],
    num_documento: ['', Validators.required],
    email: ['', Validators.required],
    telefono: ['', Validators.required],
    nombre_contacto: ['', Validators.required],
    telefono_contacto: ['', Validators.required],
  });

  arrayReservas: any[] = [];

  errorForm: boolean = false;
  loading: boolean = false;

  //alert
  texto: string = "";
  tipo: string = "";
  alert: boolean = false;

  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private emailService: EmailServiceService,
    private firebase: FirebaseService,) {
  }

  ngOnInit() {
    this.getRoute();
  }

  getRoute() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.nombre = params['nombre'];
    });

    this.firebase.getColecctionWhere('room', 'hotel', this.id).onSnapshot(data => {
      this.rooms = [];
      let array: any[] = [];
      data.docs.forEach(data => {
        array.push(data.data());
      });
      array.forEach(data => {
        if (data?.estado != 'inactivo') {
          this.rooms.push(data);
        }
      });
    });
  }


  getNombreRoom(value: { nombre: string, id: string }) {
    this.id_room = value.id;
    this.nombre_room = value.nombre;
  }

  //reserva
  sendReserva() {
    if (this.reservaForm.valid) {
      this.errorForm = false;
      this.loading = true;
      let id = this.generateRandomId();
      let data = {
        id:id,
        habitacion: this.id_room,
        name_habitacion: this.nombre_room,
        hotel: this.id,
        name_hotel: this.nombre,
        pago: '000000',
        medio_pago: 'PSE',
        fecha_reserva: this.getFormattedDate(),
        nombres: this.reservaForm.get('nombres')?.value,
        apellidos: this.reservaForm.get('apellidos')?.value,
        fecha_nacimiento: this.reservaForm.get('fecha_nacimiento')?.value,
        genero: this.reservaForm.get('genero')?.value,
        tipo_documento: this.reservaForm.get('tipo_documento')?.value,
        num_documento: this.reservaForm.get('num_documento')?.value,
        email: this.reservaForm.get('email')?.value,
        telefono: this.reservaForm.get('telefono')?.value,
        nombre_contacto: this.reservaForm.get('nombre_contacto')?.value,
        telefono_contacto: this.reservaForm.get('telefono_contacto')?.value,
      };
      this.firebase.createUser(data, id,'reservas').then(() => {
        this.emailService.sendEmail(this.reservaForm.get('email')?.value).subscribe(
          (response) => {
            this.closeModal.nativeElement.click();
            this.reservaForm.reset();
            this.loading = false;
            this.texto = "Reserva registrada correctamente. La información ha sido enviado a su correo.";
            this.tipo = "success";
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 5000);
          },
          (error) => {
            this.closeModal.nativeElement.click();
            this.reservaForm.reset();
            this.loading = false;
            this.texto = "Reserva registrada correctamente. La información ha sido enviado a su correo.";
            this.tipo = "success";
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 5000);
          }
        );
      }).catch(() => {
        this.closeModal.nativeElement.click();
        this.reservaForm.reset();
        this.loading = false;
        this.texto = "Error realizando la reserva. Intente nuevamente.";
        this.tipo = "danger";
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      });
    } else {
      this.errorForm = true;
    }
  }


  getFormattedDate(): string {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  generateRandomId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }
}
