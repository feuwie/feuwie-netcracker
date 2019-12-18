import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddFuncComponent } from "./add-func.component";

@NgModule({
  declarations: [
    AddFuncComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AddFuncComponent]
})

export class AddFuncModule { }
