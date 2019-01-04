import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { MaxValueDirective } from './max-value.directive';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MaxValueDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    UserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
