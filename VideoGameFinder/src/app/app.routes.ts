import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Wishlist } from './wishlist/wishlist';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { Details } from './details/details';
import { Genregamepage } from './genregamepage/genregamepage';


export const routes: Routes = [
    {path: '', component: Home},
    {path: 'wishlist', component:Wishlist},
    {path: 'contact', component:Contact},
    {path: 'about', component:About},
    {path: 'game/:id', component: Details},
    {path: 'genre/:genre/:name', component: Genregamepage}
];
