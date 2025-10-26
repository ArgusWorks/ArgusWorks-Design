import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RefinedCravingsCaseStudyComponent } from './pages/case-studies/refined-cravings/refined-cravings-case-study.component';
import { RefinedCravingsDemoComponent } from './pages/demos/refined-cravings/refined-cravings-demo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'case-studies/refined-cravings', component: RefinedCravingsCaseStudyComponent },
  { path: 'demos/refined-cravings', component: RefinedCravingsDemoComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];