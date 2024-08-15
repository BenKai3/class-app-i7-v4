import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroceryModalPage } from './grocery-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GroceryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroceryModalPageRoutingModule {}
