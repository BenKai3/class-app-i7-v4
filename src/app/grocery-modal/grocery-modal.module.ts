import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

import { GroceryModalPage } from './grocery-modal.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [GroceryModalPage],
  exports: [GroceryModalPage]
})
export class GroceryModalPageModule {}