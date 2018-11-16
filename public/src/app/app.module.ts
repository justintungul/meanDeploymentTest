import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'
import { HttpService } from './http.service';

import { AppComponent } from './app.component';

import { RestoAllComponent } from './resto-all/resto-all.component';
import { RestoNewComponent } from './resto-new/resto-new.component';
import { RestoEditComponent } from './resto-edit/resto-edit.component';
import { ReviewAllComponent } from './review-all/review-all.component';
import { ReviewNewComponent } from './review-new/review-new.component';

@NgModule({
  declarations: [
    AppComponent,
    RestoAllComponent,
    RestoNewComponent,
    RestoEditComponent,
    ReviewAllComponent,
    ReviewNewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
