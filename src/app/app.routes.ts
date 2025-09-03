import { Routes } from '@angular/router';
import { AboutUs } from './about-us/about-us';
import { Statistics } from './statistics/statistics';
import { CoachesComponent } from './coaches/coaches';
import { Squad } from './squad/squad';
import { Player } from './player/player';
export const routes: Routes = [
    { path: '', component: AboutUs },
    { path: 'about', component: AboutUs },
    { path: 'statistics', component: Statistics },
    { path: 'coaches', component: CoachesComponent },
    { path: 'players', component: Squad },
  { 
    path: 'players/:id', 
    component: Player,
    data: { prerender: false }  
  },
];
