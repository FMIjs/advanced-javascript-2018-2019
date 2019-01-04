import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EntityComponent } from './entity/entity.component';
import { UserService } from './user.service';

@NgModule({
  declarations: [ListComponent, EntityComponent],
  imports: [
    CommonModule
  ],
  providers: [
    // UserService,
    // {
    //   provide: UserService,
    //   useClass: UserService
    // }
  ],
  exports: [
    ListComponent
  ]
})
export class UserModule { }
