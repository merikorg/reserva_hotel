import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent implements OnInit {

  collection: string = 'hotel';

  hotelForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    fechaEntrada: ['', Validators.required],
    fechaSalida: ['', Validators.required],
    cantidad: ['', Validators.required],
    ciudad: ['', Validators.required]
  });

  columns: any[] = [
    { title: 'ID', subtitle: 'id' },
    { title: 'Nombre', subtitle: 'nombre' },
    { title: 'Descripción', subtitle: 'descripcion' },
    { title: 'Fecha de Entrada', subtitle: 'fechaEntrada' },
    { title: 'Fecha de Salida', subtitle: 'fechaSalida' },
    { title: 'Cantidad', subtitle: 'cantidad' },
    { title: 'Ciudad', subtitle: 'ciudad' },
    { title: 'Estado', subtitle: 'estado' },
  ];

  //alert
  texto: string = "";
  tipo: string = "";
  alert: boolean = false;

  //edit
  editItem: boolean = false;
  id: string = '';

  idUser: string = '';

  loading: boolean = false;

  @ViewChild('closeButton') closeButton!: ElementRef;

  constructor(private formBuilder: FormBuilder, private firebase: FirebaseService) {
  }

  ngOnInit(): void {
    this.firebase.getStatus().subscribe((user) => {
      this.idUser = `${user?.uid}`;
    });
  }

  submitForm(): void {
    this.loading = !this.loading;
    if (this.hotelForm.valid) {
      if (this.editItem) {
        this.firebase.updateUser(this.hotelForm.value, this.id, 'hotel').then(() => {
          this.loading = !this.loading;
          this.closeButton.nativeElement.click();
          this.texto = "Hotel modificado correctamente.";
          this.tipo = "success";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        }).catch(() => {
          this.loading = !this.loading;
          this.texto = "Error al modificar hotel. Intente de nuevo.";
          this.tipo = "danger";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        });
      } else {
        const id = this.generateRandomId();
        let data = {
          id: id,
          user: this.idUser,
          nombre: this.hotelForm.get('nombre')?.value,
          descripcion: this.hotelForm.get('descripcion')?.value,
          fechaEntrada: this.hotelForm.get('fechaEntrada')?.value,
          fechaSalida: this.hotelForm.get('fechaSalida')?.value,
          cantidad: this.hotelForm.get('cantidad')?.value,
          ciudad: this.hotelForm.get('ciudad')?.value,
          estado: 'activo'
        };
        this.firebase.createUser(data, id, 'hotel').then(() => {
          this.loading = !this.loading;
          this.closeButton.nativeElement.click();
          this.texto = "Hotel registrado correctamente.";
          this.tipo = "success";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        }).catch(() => {
          this.loading = !this.loading;
          this.texto = "Error al registrar hotel. Intente de nuevo.";
          this.tipo = "danger";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        });
      }
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

  generateRandomId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }


  openModal(item: any) {
    this.editItem = true;
    this.id = item.id;
    this.hotelForm.setValue({
      nombre: item.nombre,
      descripcion: item.descripcion,
      fechaEntrada: item.fechaEntrada,
      fechaSalida: item.fechaSalida,
      cantidad: item.cantidad,
      ciudad: item.ciudad
    });
  }

  resetModal() {
    this.editItem = false;
    this.hotelForm.reset();
  }

}
