import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: 'map', component: MapComponent },
    { path: 'lijst', component: ListComponent },
    { path: '', redirectTo: 'map', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
