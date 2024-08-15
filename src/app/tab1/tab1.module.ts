import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { Tab1Page } from './tab1.page'
import { GroceryModalPageModule } from '../grocery-modal/grocery-modal.module'

const routes: Routes = [
  {
    path: '',
    component: Tab1Page
  }
]

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    GroceryModalPageModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}