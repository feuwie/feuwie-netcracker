import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DeletionFuncComponent } from "./deletion-func.component";

@NgModule({
  declarations: [
    DeletionFuncComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DeletionFuncComponent]
})

export class DeletionFuncModule { }
