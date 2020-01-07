import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditFuncRoutingModule } from "./edit-func-routing.module";
import { EditFuncComponent } from "./edit-func.component";

@NgModule({
  declarations: [
    EditFuncComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditFuncRoutingModule,
  ],
  exports: [EditFuncComponent]
})

export class EditFuncModule { }
