import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudComponent } from './pages/crud/crud.component';
import { MaterialModule } from './material.module';
import { DatePipe } from '@angular/common';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
