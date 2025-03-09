import { Routes } from '@angular/router';
import { BodyComponent } from './Components/body/body.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { UserComponent } from './Components/user/user.component';

export const routes: Routes = [
    {path:"", component: BodyComponent},
    {path:"sign-up", component: BodyComponent},
    {path:"sign-in", component: BodyComponent},
    {path:"favorites", component: FavoritesComponent},
    {path:"manager", component: BodyComponent},
    {path:"establishment", component: BodyComponent},
    {path:"profile", component: UserComponent},
];
