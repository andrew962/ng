import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'projects/shared/src/lib/shared.module';
import { MaterialModule } from 'projects/shared/src/lib/modules/matmodule/material.module';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/manage/create/create.component';
import { EditComponent } from './components/manage/edit/edit.component';
import { ListManageComponent } from './components/templates/list-manage.component';
import { DialogCreateNewComponent } from './components/templates/dialog-create-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    EditComponent,
    ListManageComponent,
    DialogCreateNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
