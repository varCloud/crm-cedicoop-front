import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./views/pages/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./views/pages/cursos/cursos.module').then(m => m.CursosModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./views/pages/clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'cotizaciones',
        loadChildren: () => import('./views/pages/cotizaciones/cotizaciones.module').then(m => m.CotizacionesModule)
      },
      {
        path: 'tiposClientes',
        loadChildren: () => import('./views/pages/tipo-cliente/tipo-cliente.module').then(m => m.TipoClienteModule)
      },
      {
        path: 'tiposSeguimientos',
        loadChildren: () => import('./views/pages/tipo-seguimiento/tipo-seguimiento.module').then(m => m.TipoSeguimientoModule)
      },
      {
        path: 'catIntereses',
        loadChildren: () => import('./views/pages/cat-intereses/cat-intereses.module').then(m => m.CatInteresesModule)
      },
      {
        path: 'tiposServicios',
        loadChildren: () => import('./views/pages/tipo-servicio/tipo-servicio.module').then(m => m.TipoServicioModule)

      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
