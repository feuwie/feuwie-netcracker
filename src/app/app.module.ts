import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AddFuncComponent } from "./add-func/add-func.component";
import { AppComponent } from "./app.component";
import { DeletionFuncComponent } from "./deletion-func/deletion-func.component";
import { EditFuncComponent } from "./edit-func/edit-func.component";
import { FilterChooseDirective } from "./filterchoose.directive";
import { HighlightDirective } from "./highlight.directive";
import { PerformPipe } from "./perform.pipe";
import { SexPipe } from "./sex.pipe";
import { ChangeTextDirective } from "./textcolor.directive";

const appRoutes: Routes = [
    { path: "add", component: AddFuncComponent},
    { path: "delete", component: DeletionFuncComponent},
    { path: "edit", component: EditFuncComponent },
];
@NgModule({
    declarations: [
        AppComponent,
        DeletionFuncComponent,
        AddFuncComponent,
        EditFuncComponent,
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
        RouterModule.forRoot(appRoutes),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
