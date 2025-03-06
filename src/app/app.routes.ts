import { Routes } from '@angular/router';
import { BodyComponent } from './Components/body/body.component';

export const routes: Routes = [
    {path:"", component: BodyComponent},
    {path:"sign-up", component: BodyComponent},
    {path:"sign-in", component: BodyComponent},
    {path:"favorites", component: BodyComponent},
    {path:"manager", component: BodyComponent},
    {path:"establishment", component: BodyComponent},
    {path:"profile", component: BodyComponent},
    
];
