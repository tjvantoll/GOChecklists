import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { OddsComponent } from './odds/odds.component';
import { DexComponent } from './dex/dex.component';

@NgModule({
  declarations: [
    AppComponent,
    OddsComponent,
    DexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
