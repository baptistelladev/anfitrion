import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    ClipboardModule
  ],
  exports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ClipboardModule,
    TranslateModule
  ]
})
export class SharedModule { }
