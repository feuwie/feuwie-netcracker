import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddFuncRoutingModule } from "./add-func-routing.module";
import { AddFuncComponent } from "./add-func.component";

@NgModule({
  declarations: [
    AddFuncComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddFuncRoutingModule,
  ],
  exports: [AddFuncComponent]
})

export class AddFuncModule { }
