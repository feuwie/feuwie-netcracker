import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditFuncComponent } from "./edit-func.component";

@NgModule({
  declarations: [
    EditFuncComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [EditFuncComponent]
})

export class EditFuncModule { }
