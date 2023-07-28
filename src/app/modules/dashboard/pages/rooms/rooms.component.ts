import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {
  collection: string = 'room';

  roomForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    ubicacion: ['', Validators.required],
    disponibilidad: ['', Validators.required],
    tipo: ['', Validators.required],
    costo: ['', Validators.required],
    impuesto: ['', Validators.required],
    hotel: ['', Validators.required],
  });

  columns: any[] = [
    { title: 'ID', subtitle: 'id' },
    { title: 'Nombre', subtitle: 'nombre' },
    { title: 'Descripción', subtitle: 'descripcion' },
    { title: 'Ubicación', subtitle: 'ubicacion' },
    { title: 'Disponibilidad', subtitle: 'disponibilidad' },
    { title: 'Tipo', subtitle: 'tipo' },
    { title: 'Costo', subtitle: 'costo' },
    { title: 'Impuesto', subtitle: 'impuesto' },
    { title: 'Hotel', subtitle: 'name_hotel' },
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

  hoteles: any[]=[];

  @ViewChild('closeButton') closeButton!: ElementRef;

  constructor(private formBuilder: FormBuilder, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.firebase.getStatus().subscribe((user) => {
      this.idUser = `${user?.uid}`;
    });
    this.firebase.getUsers('hotel').subscribe(data=>{
      this.hoteles = data;
    });
  }

  submitForm(): void {
    this.loading = !this.loading;
    if (this.roomForm.valid) {
      if (this.editItem) {
        let hotelSelect = this.roomForm.get('hotel')?.value;
        let [hotel, name_hotel] = hotelSelect.split('-');
        let data = {
          nombre: this.roomForm.get('nombre')?.value,
          descripcion: this.roomForm.get('descripcion')?.value,
          ubicacion: this.roomForm.get('ubicacion')?.value,
          disponibilidad: this.roomForm.get('disponibilidad')?.value,
          tipo: this.roomForm.get('tipo')?.value,
          costo: this.roomForm.get('costo')?.value,
          impuesto: this.roomForm.get('impuesto')?.value,
          hotel: hotel,
          name_hotel: name_hotel,
        };
        this.firebase.updateUser(data, this.id, 'room').then(() => {
          this.loading = !this.loading;
          this.closeButton.nativeElement.click();
          this.texto = "Habitación modificada correctamente.";
          this.tipo = "success";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        }).catch(() => {
          this.loading = false;
          this.closeButton.nativeElement.click();
          this.texto = "Error al modificar la habitación. Intente de nuevo.";
          this.tipo = "danger";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        });
      } else {
        const id = this.generateRandomId();
        let hotelSelect = this.roomForm.get('hotel')?.value;
        let [hotel, name_hotel] = hotelSelect.split('-');
        let data = {
          id: id,
          user: this.idUser,
          nombre: this.roomForm.get('nombre')?.value,
          descripcion: this.roomForm.get('descripcion')?.value,
          ubicacion: this.roomForm.get('ubicacion')?.value,
          disponibilidad: this.roomForm.get('disponibilidad')?.value,
          tipo: this.roomForm.get('tipo')?.value,
          costo: this.roomForm.get('costo')?.value,
          impuesto: this.roomForm.get('impuesto')?.value,
          hotel: hotel,
          name_hotel: name_hotel,
          estado: 'activo'
        };
        this.firebase.createUser(data, id, 'room').then(() => {
          this.loading = !this.loading;
          this.closeButton.nativeElement.click();
          this.texto = "Habitación registrada correctamente.";
          this.tipo = "success";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        }).catch(() => {
          this.loading = !this.loading;
          this.texto = "Error al registrar la Habitación. Intente de nuevo.";
          this.tipo = "danger";
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        });
      }
    } else {
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
    this.roomForm.setValue({
      nombre: item.nombre,
      descripcion: item.descripcion,
      ubicacion: item.ubicacion,
      disponibilidad: item.disponibilidad,
      tipo: item.tipo,
      costo: item.costo,
      impuesto: item.impuesto,
      hotel: item.hotel+'-'+item.name_hotel,
    });
  }

  resetModal() {
    this.editItem = false;
    this.roomForm.reset();
  }
}
