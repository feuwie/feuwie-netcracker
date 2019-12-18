import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AddFuncModule } from "./add-func/add-func.module";
import { AppComponent } from "./app.component";
import { DeletionFuncModule } from "./deletion-func/deletion-func.module";
import { EditFuncModule } from "./edit-func/edit-func.module";
import { FilterChooseDirective } from "./filterchoose.directive";
import { HighlightDirective } from "./highlight.directive";
import { PerformPipe } from "./perform.pipe";
import { SexPipe } from "./sex.pipe";
import { ChangeTextDirective } from "./textcolor.directive";

@NgModule({
    declarations: [
        AppComponent,
        HighlightDirective,
        ChangeTextDirective,
        FilterChooseDirective,
        PerformPipe,
        SexPipe,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        EditFuncModule,
        DeletionFuncModule,
        AddFuncModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
