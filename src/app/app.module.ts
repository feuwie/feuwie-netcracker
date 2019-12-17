import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AddFuncComponent } from "./add-func/add-func.component";
import { AppComponent } from "./app.component";
import { DeletionFuncComponent } from "./deletion-func/deletion-func.component";
import { EditFuncComponent } from "./edit-func/edit-func.component";

@NgModule({
    declarations: [
        AppComponent,
        DeletionFuncComponent,
        AddFuncComponent,
        EditFuncComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent, DeletionFuncComponent, EditFuncComponent, AddFuncComponent]
})
export class AppModule { }
