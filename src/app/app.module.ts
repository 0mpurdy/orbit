import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SolarSystemComponent } from './solar-system/solar-system.component';
import { AstroBodyComponent } from './astro-body/astro-body.component';

@NgModule({
  declarations: [
    AppComponent,
    SolarSystemComponent,
    AstroBodyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
