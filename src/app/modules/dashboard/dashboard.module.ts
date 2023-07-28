import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseGuardsService } from 'src/app/services/firebase-guards/firebase-guards.service';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    MenuComponent,
    HotelComponent,
    RoomsComponent,
    PerfilComponent,
    ReservasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirebaseGuardsService]
})

export class DashboardModule { }
