import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
import { PlugComponent } from './shared/components/plug/plug.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { RayonnementComponent } from './pages/rayonnement/rayonnement.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DataComponent } from './pages/data/data.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EspComponent } from './pages/esp/esp.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { VitiiPageComponent } from './pages/vitii-page/vitii-page.component';
// import { LayoutComponent } from './modules/layout/layout.component';
// import { DashboardComponent } from './modules/dashboard/dashboard.component';
// import { PodcastComponent } from './modules/dashboard/pages/podcast/podcast.component';
// import { DateFilterComponent } from './modules/dashboard/components/date-filter/date-filter.component';
// import { DataComponent } from './modules/dashboard/pages/data/data.component';
// import { RayonnementComponent } from './modules/dashboard/pages/rayonnement/rayonnement.component';
// import { MeteoComponent } from './modules/dashboard/pages/meteo/meteo.component';
// import { ConfigComponent } from './modules/config/config.component';
// import { SettingsComponent } from './modules/config/pages/settings/settings.component';
// import { NotificationsComponent } from './modules/config/pages/notifications/notifications.component';
// import { EspComponent } from './modules/config/pages/esp/esp.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  // Layout Routes
  { path: 'dashboard', children: [
    { path: '', redirectTo: 'graphics', pathMatch: 'full' },
      { path: 'graphics', component: DashboardPageComponent },
      // { path: 'detail/:title', component: DateFilterComponent },
      { path: 'data', component: DataComponent },
      { path: 'rayonnement', component: RayonnementComponent },
      { path: 'vitii', component: VitiiPageComponent },
      // { path: 'meteo', component: MeteoComponent },
      { path: '404', component: PageNotFoundComponent },
      { path: '**', redirectTo: '404' }
    ]
  },

  // Plug Routes
  // { path: 'plugs', component: PlugComponent, children: [
  //     { path: '', redirectTo: 'plugs', pathMatch: 'full' },
  //     { path: 'plugs', component: PlugComponent },
  //     { path: '**', redirectTo: '404' }
  //   ]
  // },
  { path: 'plugs', component: PlugComponent },

  // Config Routes
  { path: 'config', children: [
      { path: '', redirectTo: 'settings', pathMatch: 'full' },
      // { path: 'settings', component: SettingsComponent },
      // { path: 'notifications', component: NotificationsComponent },
      { path: 'esp', component: EspComponent },
      { path: '**', redirectTo: '404' }
    ]
  },

  // Auth Routes
  // { path: 'auth', component: AuthComponent, children: [
  //     { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  //     { path: 'sign-in', component: SignInComponent, data: { returnUrl: window.location.pathname } },
  //     { path: 'sign-up', component: SignUpComponent },
  //     { path: 'forgot-password', component: ForgotPasswordComponent },
  //     { path: 'new-password', component: NewPasswordComponent },
  //     { path: 'two-steps', component: TwoStepsComponent },
  //     { path: '**', redirectTo: 'sign-in' }
  //   ]
  // },

  // Page Not Found Route
  { path: '404', component: PageNotFoundComponent },

  // Catch All Route for unknown paths
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule, AngularSvgIconModule.forRoot(), SelectDropDownModule, MatDialogModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
