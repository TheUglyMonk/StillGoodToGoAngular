import { Routes } from '@angular/router';
import { BodyComponent } from './Components/body/body.component';
import { FavoritesComponent } from './Components/favorites/favorites.component';
import { UserComponent } from './Components/user/user.component';
import { ManagerComponent } from './Components/manager/manager.component';
import { SignUpComponent } from './Components/auth/sign-up/sign-up.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { RequisitionComponent } from './Components/auth/requisition/requisition.component';
import { ShopComponent } from './Components/shop/shop.component';

export const routes: Routes = [
    {path:"", component: BodyComponent},
    {path:"sign-up", component: SignUpComponent},
    {path:"sign-in", component: LoginComponent},
    {path:"favorites", component: FavoritesComponent},
    {path:"manager", component: ManagerComponent},
    {path:"establishment", component: BodyComponent},
    {path:"profile", component: UserComponent},
    {path:"establishment/register-establishment", component: RequisitionComponent},
    {path: ":id", component: ShopComponent },  
];
