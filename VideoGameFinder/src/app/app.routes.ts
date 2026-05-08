import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Details } from './details/details';
import { Genregamepage } from './genregamepage/genregamepage';


export const routes: Routes = [
    {path: '', component: Home},
    {path: 'about', component:About},
    {path: 'game/:id', component: Details},
    {path: 'genre/:genre/:name', component: Genregamepage}
    
    
];
