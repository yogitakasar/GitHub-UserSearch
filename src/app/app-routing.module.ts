import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
// import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent},
      // { path: 'products',
      //   children: [
      //     {path:':type', component: ProductsComponent },
      //   ]
      // }
    ],
  },
  // {path: '404', component: PageNotFoundComponent},
  // {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
