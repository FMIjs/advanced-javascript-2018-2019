import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { MaxValueDirective } from './max-value.directive';
import { GetPropPipe } from './get-prop.pipe';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';

export const someValue = new InjectionToken('SomeValue');

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MaxValueDirective,
    GetPropPipe,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    UserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: someValue,
      useValue: 'Test1',
      multi: true
    },
    {
      provide: someValue,
      useValue: 'Test2',
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
