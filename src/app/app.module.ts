
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core/core.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';


import { passiveSupport } from 'passive-events-support/src/utils'
passiveSupport({/*...*/})

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
