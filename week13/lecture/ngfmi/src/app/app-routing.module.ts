import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { DataResolver } from './data-resolver.service';

const route: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    resolve: [DataResolver],
    data: {
      role: 'Admin'
    }
  }
];

export const AppRoutingModule = RouterModule.forRoot(route, { enableTracing: true });
