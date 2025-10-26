import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { WorkComponent } from './pages/work/work.component';
import { RefinedCravingsCaseStudyComponent } from './pages/case-studies/refined-cravings/refined-cravings-case-study.component';
import { RefinedCravingsDemoComponent } from './pages/demos/refined-cravings/refined-cravings-demo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'work', component: WorkComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'case-studies/refined-cravings', component: RefinedCravingsCaseStudyComponent },
  { path: 'demos/refined-cravings', component: RefinedCravingsDemoComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];