import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReservasComponent } from './pages/reservas/reservas.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'hotel', component: HotelComponent },
            { path: 'rooms', component: RoomsComponent },
            { path: 'perfil', component: PerfilComponent },
            { path: 'reservas', component: ReservasComponent },
            { path: '', redirectTo: 'hotel' , pathMatch: 'full'},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }