import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './pages/crud/crud.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  { path: 'foo', component: ListComponent },
  { path: 'foo/add', component: CrudComponent },
  { path: 'foo/:id', component: CrudComponent },
  { path: 'foo/:id/delete', component: CrudComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
